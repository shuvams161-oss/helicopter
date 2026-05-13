export function updateStreak(){

  const today = new Date().toDateString();

  const lastVisit = localStorage.getItem('lastVisit');

  if(lastVisit !== today){

    let streak = Number(localStorage.getItem('streak') || 0);

    streak++;

    localStorage.setItem('streak',streak);
    localStorage.setItem('lastVisit',today);
  }
}