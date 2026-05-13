import { fetchAI } from '../aiEngine.js';

export function renderPYQ(app){
  app.innerHTML = `
    <div class="card">
      <h2>AI PYQ Generator</h2>

      <input id="examType" placeholder="JEE / NEET / ICSE" />
      <input id="subject" placeholder="Subject" />
      <input id="chapter" placeholder="Chapter" />

      <button class="primary" id="generatePYQ">
        Generate PYQs
      </button>
    </div>

    <div id="pyqResults"></div>
  `;

  generatePYQ.onclick = async ()=>{
    pyqResults.innerHTML=`<div class="card">Generating...</div>`;

    const data = await fetchAI('generate-pyq',{
      exam: examType.value,
      subject: subject.value,
      chapter: chapter.value
    });

    pyqResults.innerHTML = data.questions.map(q=>`
      <div class="card">
        <h3>${q.question}</h3>
        <p><b>Answer:</b> ${q.answer}</p>
        <p>${q.explanation}</p>
      </div>
    `).join('');
  }
}
