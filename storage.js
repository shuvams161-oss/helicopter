const DEFAULT_USER = {
  username: "Student",
  xp: 0,
  level: 1,
  streak: 0,
  studyHours: 0,
  quizzesCompleted: 0,
  productivity: 50,
  achievements: [],
  weakSubjects: [],
  strongSubjects: [],
  activity: [],
  quizHistory: [],
  missions: [],
  lastStudyDate: null,
  heatmap: {}
};

export function getUser() {
  return JSON.parse(localStorage.getItem("neuro_user")) || DEFAULT_USER;
}

export function saveUser(user) {
  localStorage.setItem("neuro_user", JSON.stringify(user));
}

export function addActivity(text) {
  const user = getUser();

  user.activity.unshift({
    text,
    date: new Date().toLocaleString()
  });

  user.activity = user.activity.slice(0,20);

  saveUser(user);
}
