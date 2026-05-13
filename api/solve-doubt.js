export default async function handler(req,res){

  try{

    const {doubt} = req.body;

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
            role:'system',
            content:'Explain doubts clearly for students.'
          },
          {
            role:'user',
            content:doubt
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      answer:data.choices[0].message.content
    });

  }catch(error){
    res.status(500).json({error:error.message});
  }
}