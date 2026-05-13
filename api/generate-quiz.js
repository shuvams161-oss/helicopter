export default async function handler(req,res){

  if(req.method !== 'POST'){
    return res.status(405).json({error:'Method not allowed'});
  }

  try{

    const {subject,chapter,difficulty,count} = req.body;

    const prompt = `Generate ${count} ${difficulty} ${subject} MCQs from ${chapter}. Return JSON.`;

    const response = await fetch('https://api.x.ai/v1/chat/completions',{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${process.env.GROK_API_KEY}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        model:'grok-3-mini',
        messages:[
          {
            role:'user',
            content:prompt
          }
        ]
      })
    });

    const data = await response.json();

    let text = data.choices?.[0]?.message?.content || '';

    try{
      text = JSON.parse(text);
    }catch{
      text = {
        questions:[
          {
            question:'Sample question?',
            options:['A','B','C','D'],
            answer:'A',
            explanation:'Explanation'
          }
        ]
      };
    }

    res.status(200).json(text);

  }catch(error){
    res.status(500).json({error:error.message});
  }
}