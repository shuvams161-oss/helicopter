import { fetchAI } from '../aiEngine.js';

export function renderPlanner(app){
  app.innerHTML = `
    <div class="card">
      <h2>AI Study Planner</h2>

      <input id="exam" placeholder="Exam" />
      <input id="days" placeholder="Days Left" type="number" />
      <input id="weak" placeholder="Weak Subjects" />
      <input id="hours" placeholder="Study Hours/Day" />

      <button class="primary" id="generatePlan">
        Generate Plan
      </button>
    </div>

    <div id="plan"></div>
  `;

  generatePlan.onclick = async ()=>{
    plan.innerHTML = `<div class="card">Generating AI roadmap...</div>`;

    const data = await fetchAI('generate-plan',{
      exam: document.getElementById('exam').value,
      days: document.getElementById('days').value,
      weak: document.getElementById('weak').value,
      hours: document.getElementById('hours').value
    });

    plan.innerHTML = `
      <div class="card">
        <h2>Your AI Strategy</h2>
        <pre>${data.plan}</pre>
      </div>
    `;
  }
}
