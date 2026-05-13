export async function askAI(endpoint,payload){

  const response = await fetch(endpoint,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(payload)
  });

  return await response.json();
}