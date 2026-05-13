import { initDashboard } from './modules/dashboard.js';
import { initQuiz } from './modules/quiz.js';
import { initPlanner } from './modules/planner.js';
import { initPYQ } from './modules/pyq.js';
import { initAnalytics } from './modules/analytics.js';

const pages = document.querySelectorAll('.page');
const buttons = document.querySelectorAll('.nav-btn');

buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{

    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.section;

    pages.forEach(page=>{
      page.classList.remove('active-page');
    });

    document.getElementById(target).classList.add('active-page');
  });
});

initDashboard();
initQuiz();
initPlanner();
initPYQ();
initAnalytics();