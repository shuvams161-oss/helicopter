import { getUser, saveUser } from '../storage.js';

const ACHIEVEMENTS = [
  {
    id:'first_quiz',
    name:'First Blood',
    condition:user=>user.quizzesCompleted>=1
  },
  {
    id:'study_10',
    name:'Deep Worker',
    condition:user=>user.studyHours>=10
  }
];

export function checkAchievements(){
  const user = getUser();

  ACHIEVEMENTS.forEach(a=>{
    if(a.condition(user) && !user.achievements.includes(a.id)){
      user.achievements.push(a.id);
      alert(`🏆 Achievement Unlocked: ${a.name}`);
    }
  });

  saveUser(user);
}
