import { fetchAI } from '../aiEngine.js';

export function renderAI(app){
  app.innerHTML = `
    <div class="card">
      <h2>AI Doubt Solver</h2>

      <textarea id="doubt" rows="6"></textarea>

      <button class="primary" id="solveBtn">
        Solve Doubt
      </button>
    </div>

    <div id="response"></div>
  `;

  solveBtn.onclick = async ()=>{
    response.innerHTML=`<div class="card">AI thinking...</div>`;

    const data = await fetchAI('solve-doubt',{
      doubt: doubt.value
    });

    response.innerHTML=`
      <div class="card">
        <h2>AI Explanation</h2>
        <p>${data.answer}</p>
      </div>
    `;
  }
}
