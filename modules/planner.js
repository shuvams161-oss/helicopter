export function initPlanner(){

  document.getElementById('generatePlan').addEventListener('click',async()=>{

    const exam = document.getElementById('examName').value;
    const days = document.getElementById('daysLeft').value;
    const weak = document.getElementById('weakSubjects').value;
    const hours = document.getElementById('studyHours').value;

    const result = document.getElementById('planResult');

    result.innerHTML='Generating AI roadmap...';

    const response = await fetch('/api/generate-plan',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        exam,
        days,
        weak,
        hours
      })
    });

    const data = await response.json();

    result.innerHTML=`
      <div class="quiz-card">
        <pre>${data.plan}</pre>
      </div>
    `;
  });
}