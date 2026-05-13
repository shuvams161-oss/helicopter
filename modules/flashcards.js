import { getUser, saveUser, addActivity } from '../storage.js';
import { gainXP } from '../gamification.js';

const DEFAULT_FLASHCARDS = [
  {
    subject: 'Physics',
    question: 'SI unit of electric field?',
    answer: 'N/C'
  },
  {
    subject: 'Chemistry',
    question: 'Avogadro number?',
    answer: '6.022 × 10^23'
  },
  {
    subject: 'Math',
    question: 'Derivative of sin(x)?',
    answer: 'cos(x)'
  }
];

export function renderFlashcards(app){

  const saved =
    JSON.parse(localStorage.getItem('flashcards')) ||
    DEFAULT_FLASHCARDS;

  let current = 0;
  let flipped = false;

  function render(){

    const card = saved[current];

    app.innerHTML = `
      <div class="card flashcard-card">

        <h2>🧠 AI Flashcards</h2>

        <p>
          Card ${current + 1} / ${saved.length}
        </p>

        <div class="flashcard-inner ${flipped ? 'flipped' : ''}" id="flashcard">

          <div class="flashcard-front">
            <h3>${card.question}</h3>
          </div>

          <div class="flashcard-back">
            <h3>${card.answer}</h3>
          </div>

        </div>

        <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">

          <button class="primary" id="flipBtn">
            ${flipped ? 'Hide Answer' : 'Reveal Answer'}
          </button>

          <button class="primary" id="nextBtn">
            Next Card
          </button>

          <button class="primary" id="masteredBtn">
            Mark Mastered
          </button>

        </div>

      </div>
    `;

    document.getElementById('flipBtn').onclick = ()=>{

      flipped = !flipped;
      render();

    };

    document.getElementById('nextBtn').onclick = ()=>{

      flipped = false;
      current = (current + 1) % saved.length;

      render();

    };

    document.getElementById('masteredBtn').onclick = ()=>{

      gainXP(20);

      const user = getUser();

      user.productivity += 1;

      addActivity(`Mastered flashcard: ${card.question}`);

      saveUser(user);

      current = (current + 1) % saved.length;

      flipped = false;

      render();

    };

  }

  render();

}
