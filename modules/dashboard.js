export function initDashboard(){

  let time = 1500;
  let timerRunning = false;
  let interval;

  const timer = document.getElementById('timer');

  function updateTimer(){

    const minutes = Math.floor(time/60);
    const seconds = time%60;

    timer.innerText = `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }

  document.getElementById('startTimer').onclick = ()=>{

    if(timerRunning) return;

    timerRunning = true;

    interval = setInterval(()=>{
      time--;
      updateTimer();

      if(time<=0){
        clearInterval(interval);
        alert('Pomodoro completed 🔥');
      }

    },1000);
  };

  document.getElementById('resetTimer').onclick = ()=>{
    clearInterval(interval);
    time = 1500;
    timerRunning = false;
    updateTimer();
  };

  updateTimer();
}