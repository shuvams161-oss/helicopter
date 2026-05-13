import { getUser, saveUser, addActivity } from '../storage.js';
import { gainXP } from '../gamification.js';

export function generateDailyMissions(){

  const user = getUser();

  const weak =
    user.weakSubjects[0] || 'Physics';

  const missions = [

    {
      id: 1,
      title: `Complete 1 ${weak} quiz`,
      xp: 60,
      done: false
    },

    {
      id: 2,
      title: 'Study for 45 minutes',
      xp: 40,
      done: false
    },

    {
      id: 3,
      title: 'Review 5 flashcards',
      xp: 35,
      done: false
    },

    {
      id: 4,
      title: 'Solve 3 PYQs',
      xp: 70,
      done: false
    }

  ];

  localStorage.setItem(
    'daily_missions',
    JSON.stringify(missions)
  );

  return missions;

}

export function getDailyMissions(){

  return JSON.parse(
    localStorage.getItem('daily_missions')
  ) || generateDailyMissions();

}

export function renderMissions(app){

  let missions = getDailyMissions();

  app.innerHTML = `

    <div class="card">

      <h2>🎯 Daily Missions</h2>

      <div id="missionsList">

        ${missions.map(m=>`

          <div class="mission ${m.done ? 'done' : ''}">

            <div>
              <h3>${m.title}</h3>
              <p>+${m.xp} XP</p>
            </div>

            <button
              class="primary completeMission"
              data-id="${m.id}"
              ${m.done ? 'disabled' : ''}
            >
              ${m.done ? 'Completed' : 'Complete'}
            </button>

          </div>

        `).join('')}

      </div>

    </div>

  `;

  document.querySelectorAll('.completeMission')
    .forEach(btn=>{

      btn.onclick = ()=>{

        const id = Number(btn.dataset.id);

        missions = missions.map(m=>{

          if(m.id === id && !m.done){

            gainXP(m.xp);

            addActivity(
              `Completed mission: ${m.title}`
            );

            return {
              ...m,
              done:true
            };

          }

          return m;

        });

        const user = getUser();

        user.missionsCompleted =
          (user.missionsCompleted || 0) + 1;

        saveUser(user);

        localStorage.setItem(
          'daily_missions',
          JSON.stringify(missions)
        );

        renderMissions(app);

      };

    });

}
