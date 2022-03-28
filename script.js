'use strict';

//selecting the elements
const secretNumber = document.querySelector('.number');
const guessNumber = document.querySelector('.guess');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

//Initializing of required variables
let correctAnswer = Math.trunc(Math.random() * 20) + 1;
let currentScore = 20;
let currentHighScore = 0;

//Implementation
checkBtn.addEventListener('click', gameLogic);
againBtn.addEventListener('click', reloadTheGame);

function gameLogic() {
  let choice = Number(guessNumber.value);
  if (choice !== 0 && !choice) {
    //no input
    message.textContent = `😶 Please try again!`;
  } else {
    currentScore--;
    if (choice === correctAnswer) {
      //the player won
      winLose();
      message.textContent = `🎉Yay! You won.`;
      if (currentScore > currentHighScore) {
        message.textContent += `New High Score!`;
        currentHighScore = currentScore;
      }
      highScore.textContent = currentHighScore;
      changeBackgrond('#6ab04c');
    } else {
      if (choice > correctAnswer) {
        tryAgain('smaller');
      } else if (choice < correctAnswer) {
        tryAgain('larger');
      }
      if (currentScore === 0) {
        //the player lost
        winLose();
        message.textContent = `😭You lost!`;
        changeBackgrond('#e84118');
      }
    }
  }
}

function reloadTheGame() {
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  currentScore = 20;
  score.textContent = currentScore;
  changeBackgrond('#222');
  message.textContent = `Start guessing...`;
  correctAnswer = Math.trunc(Math.random() * 20) + 1;
  checkBtn.addEventListener('click', gameLogic);
}

function changeBackgrond(color) {
  document.querySelector('body').style.backgroundColor = color;
}

function winLose() {
  document.querySelector('.number').textContent = correctAnswer;
  document.querySelector('.number').style.width = '30rem';
  score.textContent = currentScore;
  checkBtn.removeEventListener('click', gameLogic);
}

function tryAgain(arg) {
  message.textContent = 'Try something a bit ';
  message.textContent += `${arg}!`;
  score.textContent = currentScore;
  guessNumber.value = '';
}
