import { getUser, saveUser } from '../storage.js';
import { gainXP } from '../gamification.js';

let seconds = 1500;
let interval;

export function startPomodoro(display){
  clearInterval(interval);

  interval = setInterval(()=>{
    seconds--;

    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;

    display.textContent = `${mins}:${secs.toString().padStart(2,'0')}`;

    if(seconds <= 0){
      clearInterval(interval);

      const user = getUser();
      user.studyHours += 0.42;
      saveUser(user);

      gainXP(100);

      alert('Pomodoro Complete 🍅');
    }
  },1000);
}
