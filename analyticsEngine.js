import { getUser } from './storage.js';

export function calculateAnalytics(){
  const user = getUser();

  return {
    totalXP: user.xp,
    studyHours: user.studyHours,
    streak: user.streak,
    quizzes: user.quizzesCompleted,
    productivity: user.productivity
  };
}
