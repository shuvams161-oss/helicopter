export default async function handler(req,res){

  try{

    const {exam,days,weak,hours} = req.body;

    const prompt = `Create a ${days} day study plan for ${exam}. Weak subjects: ${weak}. Hours/day: ${hours}`;

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

    res.status(200).json({
      plan:data.choices[0].message.content
    });

  }catch(error){
    res.status(500).json({error:error.message});
  }
}