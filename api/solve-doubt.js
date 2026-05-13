export default async function handler(req,res){
  const response = await fetch('https://api.x.ai/v1/chat/completions',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${process.env.GROK_API_KEY}`
    },
    body: JSON.stringify({
      model:'grok-3-mini',
      messages:[
        {
          role:'system',
          content:'Explain like an elite exam mentor.'
        },
        {
          role:'user',
          content:req.body.doubt
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    answer:data.choices[0].message.content
  });
}
