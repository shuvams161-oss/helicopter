import { pyqs } from '../pyqData.js';

export function initPYQ(){

  const container = document.getElementById('pyqContainer');

  pyqs.forEach(q=>{

    const div = document.createElement('div');
    div.className='quiz-card';

    div.innerHTML=`
      <h3>${q.subject} • ${q.chapter}</h3>
      <p>${q.question}</p>
      <p><strong>Answer:</strong> ${q.answer}</p>
      <button class="primary-btn">Bookmark</button>
    `;

    container.appendChild(div);
  });
}