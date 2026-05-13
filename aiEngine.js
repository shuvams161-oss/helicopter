export async function fetchAI(endpoint, payload){
  const res = await fetch(`/api/${endpoint}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(payload)
  });

  return await res.json();
}
