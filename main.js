function loadChapter(chapter) {

  const conceptScript = document.createElement("script");
  conceptScript.src = `concepts/${chapter}.js`;

  const questionScript = document.createElement("script");
  questionScript.src = `questions/${chapter}.js`;

  document.body.appendChild(conceptScript);
  document.body.appendChild(questionScript);
}
