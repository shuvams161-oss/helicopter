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
          role:'user',
          content:`Create an AI study plan using:

          ${JSON.stringify(req.body)}

          Include:
          - daily schedule
          - revision roadmap
          - productivity tips
          - weak subject focus
          - mock test strategy`
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    plan:data.choices[0].message.content
  });
}
