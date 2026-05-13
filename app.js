import { renderDashboard } from './modules/dashboard.js';
import { renderQuiz } from './modules/quiz.js';
import { renderPlanner } from './modules/planner.js';
import { renderAnalytics } from './modules/analytics.js';
import { renderPYQ } from './modules/pyq.js';
import { renderAI } from './modules/ai.js';
import { renderFlashcards } from './modules/flashcards.js';

const app = document.getElementById('app');

const pages = {

  dashboard: renderDashboard,

  study: renderFlashcards,

  quiz: renderQuiz,

  pyq: renderPYQ,

  planner: renderPlanner,

  analytics: renderAnalytics,

  doubts: renderAI

};

function load(page){

  if(!pages[page]){

    app.innerHTML = `
      <div class="card">
        <h2>Page Not Found</h2>
      </div>
    `;

    return;

  }

  app.innerHTML = '';

  pages[page](app);

}

load('dashboard');

document
  .querySelectorAll('[data-page]')
  .forEach(btn => {

    btn.onclick = () => {

      const page = btn.dataset.page;

      load(page);

    };

  });
