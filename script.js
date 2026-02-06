const quizBank = [
  {
    category: "Westminster Shorter Catechism",
    prompt: "What is the chief end of man?",
    choices: [
      "To glorify God and to enjoy Him forever.",
      "To pursue wisdom and prosperity.",
      "To obey civil rulers in all things.",
      "To maximize personal happiness."
    ],
    answer: 0
  },
  {
    category: "Westminster Confession",
    prompt: "Which principle summarizes Reformed worship practice?",
    choices: [
      "Regulative principle of worship",
      "Consumer preference principle",
      "Only festival-day liturgy",
      "No ordinary means of grace"
    ],
    answer: 0
  },
  {
    category: "Three Forms of Unity",
    prompt: "Which set makes up the Three Forms of Unity?",
    choices: [
      "Second Helvetic Confession, Savoy, Thirty-Nine Articles",
      "Heidelberg Catechism, Belgic Confession, Canons of Dort",
      "Westminster Standards and Scots Confession",
      "Apostles', Nicene, and Athanasian Creeds"
    ],
    answer: 1
  },
  {
    category: "Reformer Facts",
    prompt: "Which reformer is most associated with Geneva and the Institutes?",
    choices: ["John Knox", "Martin Bucer", "John Calvin", "Ulrich Zwingli"],
    answer: 2
  },
  {
    category: "Puritan Legacy",
    prompt: "Which Puritan wrote 'The Mortification of Sin'?",
    choices: ["Richard Baxter", "John Owen", "Thomas Goodwin", "John Flavel"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let deck = [];
let locked = false;

const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const categoryEl = document.getElementById("category");
const promptEl = document.getElementById("prompt");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

function shuffle(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function beginGame() {
  deck = shuffle(quizBank);
  currentQuestion = 0;
  score = 0;
  locked = false;
  scoreEl.textContent = score;
  startBtn.disabled = true;
  nextBtn.disabled = true;
  feedbackEl.textContent = "Game started—answer carefully!";
  renderQuestion();
}

function renderQuestion() {
  const item = deck[currentQuestion];

  if (!item) {
    categoryEl.textContent = "Final Score";
    promptEl.textContent = `You finished with ${score}/${deck.length}. Play again and improve your doctrinal memory!`;
    choicesEl.innerHTML = "";
    progressEl.textContent = `${deck.length}/${deck.length}`;
    nextBtn.disabled = true;
    startBtn.disabled = false;
    startBtn.textContent = "Play Again";
    return;
  }

  locked = false;
  categoryEl.textContent = item.category;
  promptEl.textContent = item.prompt;
  progressEl.textContent = `${currentQuestion + 1}/${deck.length}`;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";

  item.choices.forEach((choiceText, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.textContent = choiceText;
    btn.addEventListener("click", () => checkAnswer(btn, index));
    choicesEl.appendChild(btn);
  });
}

function checkAnswer(button, selectedIndex) {
  if (locked) return;

  const item = deck[currentQuestion];
  locked = true;
  const buttons = [...choicesEl.querySelectorAll("button")];

  buttons.forEach((btn, idx) => {
    if (idx === item.answer) btn.classList.add("correct");
  });

  if (selectedIndex === item.answer) {
    score += 1;
    scoreEl.textContent = score;
    feedbackEl.textContent = "Correct. Soli Deo Gloria!";
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
    feedbackEl.textContent = "Not quite—review and keep going.";
  }

  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestion += 1;
  nextBtn.disabled = true;
  renderQuestion();
}

if (startBtn && nextBtn) {
  startBtn.addEventListener("click", beginGame);
  nextBtn.addEventListener("click", nextQuestion);
}
