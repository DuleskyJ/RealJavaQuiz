// Creating my const values 
const qContainer = document.querySelector('.container');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const timeLeftDisplay = document.getElementById('time-left');
const questionDisplay = document.getElementById('question');
const answersDisplay = document.getElementById('answers');
const finalScoreElement = document.getElementById('final-score');
const submitScoreBtn = document.getElementById('submit-score-btn');
const scoreForm = document.getElementById('score-form');

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
    answers: ["21!", "  ", "Computer Style Sheets"],
    correctAnswer: "Cascading Style Sheets"
  },
  // Add more questions here
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

// Start Quiz Function
function startQuiz() {
  startScreen.classList.add('hide');
  quizScreen.classList.remove('hide');
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
    // Correct
  } else {
    // Incorrect
    timeLeft -= 10; // TAKE 10 SECONDS AWAY FOR BEING BAD!
    timeLeftDisplay.textContent = timeLeft;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  quizScreen.classList.add('hide');
  gameOverScreen.classList.remove('hide');
  clearInterval(timerInterval); // Stop timer
  finalScoreElement.textContent = timeLeft;
  gameOverScreen.style.display = 'block'; // Disable display: flex and use block to fix shrink issue
}

// Add event listener for submit score button
scoreForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  const initials = document.getElementById('initials').value;
  if (initials) {
    saveScore(initials, timeLeft);
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
