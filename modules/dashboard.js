import { getUser } from '../storage.js';

export function renderDashboard(app){
  const user = getUser();

  const required = user.level * 200;
  const percent = (user.xp / required) * 100;

  app.innerHTML = `
    <div class="grid">
      <div class="card">
        <h2>⚡ Level ${user.level}</h2>
        <p>${user.xp}/${required} XP</p>
        <div class="progress">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>
      </div>

      <div class="card">
        <h2>🔥 ${user.streak} Day Streak</h2>
        <p>Consistency is power.</p>
      </div>

      <div class="card">
        <h2>📚 Study Hours</h2>
        <p>${user.studyHours.toFixed(1)} hrs</p>
      </div>

      <div class="card">
        <h2>🧠 Productivity</h2>
        <p>${user.productivity}%</p>
      </div>
    </div>

    <div class="card">
      <h2>Recent Activity</h2>
      ${user.activity.map(a=>`<p>• ${a.text}</p>`).join('')}
    </div>

    <div class="card">
      <h2>AI Insights</h2>
      <p>
        ${user.weakSubjects.length
          ? `Focus more on ${user.weakSubjects.join(', ')}`
          : 'You are building strong consistency 🚀'}
      </p>
    </div>
  `;
}
