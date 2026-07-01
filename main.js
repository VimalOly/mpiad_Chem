function showConcepts(chapter) {

  const data = window.conceptBank?.[chapter];

  if (!data) return "<p>No concepts yet</p>";

  let html = "<h2>Concepts</h2>";

  data.forEach(c => {
    html += `
      <div>
        <b>${c.title}</b><br>
        ${c.explain}<br>
        <i>${c.tip}</i>
      </div>
    `;
  });

  return html;
}


function start() {

  const chapter = document.getElementById("chapter").value.toLowerCase().trim();

  if (!chapter) return alert("Enter chapter");

  document.getElementById("conceptBox").innerHTML =
    showConcepts(chapter);

  document.getElementById("confirmBox").innerHTML =
    `<button onclick="startTest('${chapter}')">Yes</button>`;
}


/* QUIZ */

let questions = [];
let current = 0;
let score = 0;

function startTest(chapter) {

  questions = window.questionBank?.[chapter];

  if (!questions) return alert("No questions");

  current = 0;
  score = 0;

  loadQ();
}

function loadQ() {

  if (current >= questions.length) {
    document.getElementById("quizBox").innerHTML =
      `<h2>Score: ${score}</h2>`;
    return;
  }

  const q = questions[current];

  let html = `<h3>${q.question}</h3>`;

  q.options.forEach((opt, i) => {
    html += `<div onclick="check(${i})">${opt}</div>`;
  });

  document.getElementById("quizBox").innerHTML = html;
}

function check(i) {

  if (i === questions[current].answer) score++;

  current++;
  loadQ();
}

function loadChapter(chapter) {

  const conceptScript = document.createElement("script");
  conceptScript.src = `concepts/${chapter}.js`;

  const questionScript = document.createElement("script");
  questionScript.src = `questions/${chapter}.js`;

  document.body.appendChild(conceptScript);
  document.body.appendChild(questionScript);
}
