export default async function handler(req,res){
  const { exam, subject, chapter, difficulty, count } = req.body;

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
          content:'Return only valid JSON.'
        },
        {
          role:'user',
          content:`Generate ${count} ${difficulty} ${exam} ${subject} questions from ${chapter}. Return JSON:
          {
            questions:[
              {
                question:'',
                options:['','','',''],
                answer:'',
                explanation:''
              }
            ]
          }`
        }
      ],
      temperature:0.8
    })
  });

  const data = await response.json();

  const text = data.choices[0].message.content;

  res.status(200).json(JSON.parse(text));
}
