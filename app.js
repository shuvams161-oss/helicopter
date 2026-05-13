import { renderDashboard } from './modules/dashboard.js';
import { renderQuiz } from './modules/quiz.js';
import { renderPlanner } from './modules/planner.js';
import { renderAnalytics } from './modules/analytics.js';
import { renderPYQ } from './modules/pyq.js';
import { renderAI } from './modules/ai.js';

const app = document.getElementById('app');

const pages = {
  dashboard: renderDashboard,
  quiz: renderQuiz,
  planner: renderPlanner,
  analytics: renderAnalytics,
  pyq: renderPYQ,
  doubts: renderAI
};

function load(page){
  app.innerHTML='';
  pages[page](app);
}

load('dashboard');

[...document.querySelectorAll('[data-page]')].forEach(btn=>{
  btn.onclick=()=>load(btn.dataset.page);
});
