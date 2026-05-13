import { getUser, saveUser } from './storage.js';

export function gainXP(amount) {
  const user = getUser();

  user.xp += amount;

  const required = user.level * 200;

  if(user.xp >= required){
    user.level++;
    user.xp -= required;

    launchConfetti();
    alert(`LEVEL UP 🚀 You reached level ${user.level}`);
  }

  saveUser(user);
}

export function updateStreak() {
  const user = getUser();
  const today = new Date().toDateString();

  if(user.lastStudyDate !== today){
    user.streak++;
    user.lastStudyDate = today;
    user.heatmap[today] = true;
  }

  saveUser(user);
}

function launchConfetti(){
  for(let i=0;i<40;i++){
    const div = document.createElement('div');
    div.style.position='fixed';
    div.style.width='8px';
    div.style.height='8px';
    div.style.background=`hsl(${Math.random()*360},100%,50%)`;
    div.style.left=Math.random()*100+'vw';
    div.style.top='-10px';
    div.style.borderRadius='50%';
    div.style.zIndex=9999;
    div.style.transition='2s';

    document.body.appendChild(div);

    setTimeout(()=>{
      div.style.transform=`translateY(${window.innerHeight+100}px)`;
      div.style.opacity=0;
    },50);

    setTimeout(()=>div.remove(),2200);
  }
}
