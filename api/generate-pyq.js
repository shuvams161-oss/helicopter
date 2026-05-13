export default async function handler(req,res){
  const { exam, subject, chapter } = req.body;

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
          role:'user',
          content:`Generate realistic ${exam} PYQ-style ${subject} questions for ${chapter}. Return JSON.`
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json(JSON.parse(data.choices[0].message.content));
}
