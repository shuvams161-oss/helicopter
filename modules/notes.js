export function saveNote(title,content){

  const notes = JSON.parse(localStorage.getItem('notes') || '[]');

  notes.push({title,content});

  localStorage.setItem('notes',JSON.stringify(notes));
}