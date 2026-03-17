import{useState}from"react";
export default function App(){
const[s,setS]=useState(0);
const[r,setR]=useState("");
const[msgs,setMsgs]=useState([]);
const[inp,setInp]=useState("");
const[load,setLoad]=useState(false);
const races=["5K","10K","Half Marathon","Marathon","50K Ultra","50 Mile Ultra","100K Ultra","100 Mile Ultra"];
async function ask(m){
const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:m,system:"You are APEX, an elite running coach. Be expert and motivational."})});
const d=await res.json();
return d.content?.[0]?.text||"Keep pushing.";
}
async function start(race){
setR(race);setS(1);setLoad(true);
const t=await ask([{role:"user",content:"Welcome me as a runner training for a "+race+". 2 paragraphs."}]);
setMsgs([{role:"assistant",content:t}]);
setLoad(false);
}
async function send(){
if(!inp.trim()||load)return;
const m=[...msgs,{role:"user",content:inp}];
setMsgs(m);setInp("");setLoad(true);
const t=await ask(m);
setMsgs([...m,{role:"assistant",content:t}]);
setLoad(false);
}
if(s===0)return(
<div style={{minHeight:"100vh",background:"#0a1a0b",color:"#e8f5e3",fontFamily:"system-ui",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px",textAlign:"center"}}>
<div style={{fontSize:"11px",letterSpacing:"6px",color:"#4ade80",border:"1px solid #2d6a30",padding:"4px 12px",marginBottom:"24px"}}>APEX</div>
<h1 style={{fontSize:"56px",fontWeight:"900",lineHeight:"1",marginBottom:"16px"}}>5K to 100 Miles</h1>
<p style={{color:"#86b88a",marginBottom:"32px"}}>AI ultra marathon coaching</p>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",width:"100%",maxWidth:"400px"}}>
{races.map(r=><button key={r} onClick={()=>start(r)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid #1e3d20",borderRadius:"8px",padding:"14px",cursor:"pointer",fontSize:"14px",color:"#e8f5e3"}}>{r}</button>)}
</div>
</div>
);
return(
<div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#0a1a0b",color:"#e8f5e3",fontFamily:"system-ui"}}>
<div style={{padding:"14px 16px",borderBottom:"1px solid #1e3d20",display:"flex",alignItems:"center",gap:"12px"}}>
<button onClick={()=>setS(0)} style={{background:"none",border:"1px solid #2d6a30",color:"#86b88a",padding:"6px 12px",borderRadius:"4px",cursor:"pointer"}}>Back</button>
<span style={{color:"#4ade80",fontSize:"14px"}}>APEX — {r}</span>
</div>
<div style={{flex:"1",overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"}}>
{msgs.map((m,i)=><div key={i} style={{padding:"12px 14px",borderRadius:"10px",fontSize:"14px",lineHeight:"1.6",maxWidth:"85%",background:m.role==="assistant"?"rgba(255,255,255,0.05)":"rgba(74,222,128,0.12)",border:m.role==="assistant"?"1px solid #1e3d20":"1px solid rgba(74,222,128,0.3)",marginLeft:m.role==="user"?"auto":"0"}}>{m.content}</div>)}
{load&&<div style={{padding:"12px",color:"#4ade80"}}>Thinking...</div>}
</div>
<div style={{padding:"12px 16px",borderTop:"1px solid #1e3d20",display:"flex",gap:"8px"}}>
<input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask your coach..." style={{flex:"1",background:"rgba(255,255,255,0.05)",border:"1px solid #2d6a30",borderRadius:"6px",color:"#e8f5e3",padding:"10px 14px",fontSize:"15px",outline:"none"}}/>
<button onClick={send} disabled={load||!inp.trim()} style={{background:"#4ade80",color:"#0a1a0b",border:"none",width:"42px",borderRadius:"6px",fontSize:"20px",cursor:"pointer"}}>↑</button>
</div>
</div>
);
}


