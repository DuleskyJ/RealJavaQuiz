// Creating my const values 
const qContainer = document.querySelector('.container');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const tryAgainBtn = document.getElementById('try-again-btn'); // New Try Again button
const timeLeftDisplay = document.getElementById('time-left');
const questionDisplay = document.getElementById('question');
const answersDisplay = document.getElementById('answers');
const finalScoreElement = document.getElementById('final-score');
const submitScoreBtn = document.getElementById('submit-score-btn');
const scoreForm = document.getElementById('score-form');
const scoreDisplay = document.getElementById('score-display'); // New element for displaying scores

// Creating variables 
let currentQuestionIndex = 0;
let timeLeft = 60; // Quiz time limit
let timerInterval;

// Questions array 
const questions = [
  {
    question: "Which symbol is used for comments in Javascript?",
    answers: ["// Double Slash", "<!-- This Syntax --!>", "Quotations\""],
    correctAnswer: "// Double Slash",
  },
  {
    question: "What would be the result of this intense math equation 9+10+\"21\"?",
    answers: ["21!", "1921", "40"],
    correctAnswer: "1921"
  },
  {
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    answers: ["<script href='script.js'>", "<script src='script.js'>", "<script ref='script.js'>"],
    correctAnswer: "<script src='script.js'>"
  },
  {
    question: "Which built-in method removes the last element from an array and returns that element?",
    answers: ["last()", "get()", "pop()"],
    correctAnswer: "pop()"
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Netscape", "Microsoft", "Sun Microsystems"],
    correctAnswer: "Netscape"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<js>", "<javascript>", "<script>"],
    correctAnswer: "<script>"
  },
  {
    question: "What is the output of the following code: console.log(typeof NaN);",
    answers: ["string", "number", "object"],
    correctAnswer: "number"
  },
  {
    question: "Which JavaScript method is used to write HTML output?",
    answers: ["document.write()", "document.output()", "document.createElement()"],
    correctAnswer: "document.write()"
  },
  {
    question: "Which of the following is a JavaScript data type?",
    answers: ["float", "number", "decimal"],
    correctAnswer: "number"
  }
];

// Creating a timer function
function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000); // Update the timer every second
}

// Event listener for start button click
startBtn.addEventListener('click', startQuiz);

// Event listener for try again button click
tryAgainBtn.addEventListener('click', resetQuiz);

// Start Quiz Function
function startQuiz() {
  startScreen.classList.add('hide');
  quizScreen.classList.remove('hide');
  gameOverScreen.classList.add('hide');
  gameOverScreen.style.display = ''; // Remove inline style
  startTimer();
  displayQuestion();
}

// Function to display questions
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionDisplay.textContent = currentQuestion.question;

  // Clear previous answers
  answersDisplay.innerHTML = '';

  // Display answer options
  currentQuestion.answers.forEach(answer => {
    const answerBtn = document.createElement('button');
    answerBtn.textContent = answer;
    answerBtn.classList.add('answer-btn');
    answerBtn.addEventListener('click', checkAnswer);
    answersDisplay.appendChild(answerBtn);
  });
}

// Function to check the selected answer
function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    // Correct answer
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  } else {
    // Incorrect answer
    timeLeft -= 5; // TAKE 5 SECONDS AWAY FOR BEING WRONG!
    timeLeftDisplay.textContent = timeLeft;
  }
}

// Function to end the quiz
function endQuiz() {
  quizScreen.classList.add('hide');
  gameOverScreen.classList.remove('hide');
  clearInterval(timerInterval); // Stop timer
  finalScoreElement.textContent = timeLeft;
  gameOverScreen.style.display = 'block'; // Disable display: flex and use block
}

// Function to reset the quiz
function resetQuiz() {
  gameOverScreen.classList.add('hide');
  startScreen.classList.remove('hide');
  quizScreen.classList.add('hide'); // Ensure quiz screen is hidden
  gameOverScreen.style.display = ''; // Remove inline style
  currentQuestionIndex = 0;
  timeLeft = 60;
  timeLeftDisplay.textContent = timeLeft;
  questionDisplay.textContent = '';
  answersDisplay.innerHTML = '';
}

// Add event listener for submit score button
scoreForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  const initials = document.getElementById('initials').value;
  if (initials) {
    saveScore(initials, timeLeft);
    updateScoreDisplay(initials, timeLeft); 
  }
});

// Function to save the score
function saveScore(initials, score) {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const newScore = { initials, score };
  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5); // Keep only top 5 scores
  localStorage.setItem('highScores', JSON.stringify(highScores));
  alert('Score saved!');
}

// Function to update the score display
function updateScoreDisplay(initials, score) {
  const scoreEntry = document.createElement('div');
  scoreEntry.textContent = `${initials}: ${score}`;
  scoreDisplay.appendChild(scoreEntry);
  scoreDisplay.classList.remove('hide'); // Show the score display container
}
