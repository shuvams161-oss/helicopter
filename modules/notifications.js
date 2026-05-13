export function showNotification(message){

  const div = document.createElement('div');

  div.innerText = message;

  div.style.position='fixed';
  div.style.top='20px';
  div.style.right='20px';
  div.style.padding='16px';
  div.style.background='#8b5cf6';
  div.style.borderRadius='12px';

  document.body.appendChild(div);

  setTimeout(()=>{
    div.remove();
  },3000);
}
