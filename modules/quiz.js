export function initQuiz(){

  document.getElementById('generateQuiz').addEventListener('click',async()=>{

    const subject = document.getElementById('quizSubject').value;
    const chapter = document.getElementById('quizChapter').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    const count = document.getElementById('quizCount').value;

    const container = document.getElementById('quizContainer');

    container.innerHTML = '<p>Generating AI quiz...</p>';

    try{

      const response = await fetch('/api/generate-quiz',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          subject,
          chapter,
          difficulty,
          count
        })
      });

      const data = await response.json();

      container.innerHTML='';

      data.questions.forEach((q,index)=>{

        const div = document.createElement('div');
        div.className='quiz-card';

        div.innerHTML=`
          <h3>Q${index+1}. ${q.question}</h3>
          ${q.options.map(opt=>`<div class="option">${opt}</div>`).join('')}
          <p><strong>Answer:</strong> ${q.answer}</p>
          <p>${q.explanation}</p>
        `;

        container.appendChild(div);
      });

    }catch(err){
      container.innerHTML='Failed to generate quiz';
    }
  });
}