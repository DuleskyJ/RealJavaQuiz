// Creating my const values 
const qContainer = document.querySelector('.container');
const start = document.getElementById('start-screen');
const quiz = document.getElementById('quiz-screen');
const gameOver = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const timeLeftDisplay = document.getElementById('time-left');
const qDisplay = document.getElementById('question');
const aDisplay = document.getElementById('answers');

// Creating variables 
let currentQuestionIndex = 0;
let timeLeft = 60; // Quiz time limit

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
  // Add Qs here
];

// Creating a timer function
function startTimer() {
  const timerInterval = setInterval(function() {
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
    // 
  } else {
    // Incorrect 
    timeLeft -= 10; // TAKE 10 SECONDS AWAY FOR BEING BAD!
    timeLeftDisplay.textContent = timeLeft;
    console.log("no, you stupid!")
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
  // 
}

