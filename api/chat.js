export default async function handler(req,res){
if(req.method!=="POST"){return res.status(405).json({error:"Method not allowed"});}
const{messages,system}=req.body;
const contents=system?[{role:"user",parts:[{text:"System: "+system}]},{role:"model",parts:[{text:"Understood."}]},...messages.map(m=>({role:m.role==="assistant"?"model":"user",parts:[{text:m.content}]}))]:messages.map(m=>({role:m.role==="assistant"?"model":"user",parts:[{text:m.content}]}));
try{
const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+process.env.GEMINI_API_KEY;
const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents,generationConfig:{maxOutputTokens:1000,temperature:0.8}})});
const data=await response.json();
const text=data.candidates?.[0]?.content?.parts?.[0]?.text||"Keep pushing.";
return res.status(200).json({content:[{type:"text",text}]});
}catch(e){
return res.status(500).json({error:"Server error"});
}}

