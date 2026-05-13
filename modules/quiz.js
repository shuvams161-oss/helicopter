import { fetchAI } from '../aiEngine.js';
    quizContainer.innerHTML = data.questions.map((q,i)=>`
      <div class="card">
        <h3>${i+1}. ${q.question}</h3>

        ${q.options.map(opt=>`
          <div class="quiz-option">
            ${opt}
          </div>
        `).join('')}

        <button class="primary answerBtn" data-answer="${q.answer}">
          Reveal Answer
        </button>

        <div class="answer"></div>
      </div>
    `).join('');

    document.querySelectorAll('.answerBtn').forEach((btn,index)=>{
      btn.onclick=()=>{
        const ans = data.questions[index];

        btn.nextElementSibling.innerHTML = `
          <p><b>Answer:</b> ${ans.answer}</p>
          <p>${ans.explanation}</p>
        `;

        score += 20;

        const user = getUser();
        user.quizzesCompleted++;
        user.quizHistory.push({
          subject,
          chapter,
          score
        });

        saveUser(user);

        gainXP(50);

        addActivity(`Completed ${subject} quiz`);
      }
    });
  }

  const examEl = document.getElementById('exam');
  const subjectEl = document.getElementById('subject');
  const chapterEl = document.getElementById('chapter');
  const difficultyEl = document.getElementById('difficulty');
  const countEl = document.getElementById('count');
  const quizContainer = document.getElementById('quizContainer');
}
