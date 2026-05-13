import { getUser } from '../storage.js';

export function renderAnalytics(app){
  const user = getUser();

  const avg = user.quizHistory.length
    ? user.quizHistory.reduce((a,b)=>a+b.score,0)/user.quizHistory.length
    : 0;

  app.innerHTML = `
    <div class="grid">
      <div class="card">
        <h2>Quiz Accuracy</h2>
        <h1>${avg.toFixed(1)}%</h1>
      </div>

      <div class="card">
        <h2>Quizzes Completed</h2>
        <h1>${user.quizzesCompleted}</h1>
      </div>

      <div class="card">
        <h2>Study Hours</h2>
        <h1>${user.studyHours}</h1>
      </div>
    </div>
  `;
}
