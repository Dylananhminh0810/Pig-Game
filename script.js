'use strict';
const player = document.querySelectorAll('.player');
const score = document.querySelectorAll('.score');
const diceX = document.querySelector('.dice');
let currentScore = document.querySelectorAll('.current-score');
const newGameButton = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const name = document.querySelectorAll('.name');
let flag = 0;
console.log(diceX);
console.log(score);
console.log(currentScore);
console.log(diceX.src);

//reset
newGameButton.addEventListener('click', function initialGame() {
  flag = 1;
  for (let i = 0; i < score.length; i++) {
    score[i].textContent = 0;
    currentScore[i].textContent = 0;
    name[i].textContent = `Player ${Number(i + 1)}`;
    player[i].classList.remove('player--winner');
    player[i].classList.remove('player--active');
  }
  player[0].classList.add('player--active');
  diceX.src = `dice-6.png`;
});

//Dice roll
let value_CurrentScore = 0;
let activePlayer = 0;
function generateRandomDiceRoll() {
  if (flag === 0) return;
  let randomNum = Math.trunc(Math.random() * 6 + 1);
  diceX.src = `dice-${randomNum}.png`;
  if (randomNum !== 1) {
    //add the dice to the current score
    value_CurrentScore += randomNum;
    document.getElementById(`current--${activePlayer}`).textContent =
      value_CurrentScore;
  } else {
    //switch player without adding
    value_CurrentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      value_CurrentScore;
    player[activePlayer].classList.remove('player--active');
    activePlayer ^= 1;
    player[activePlayer].classList.add('player--active');
  }
}
buttonRoll.addEventListener('click', generateRandomDiceRoll);

//Add score 'hold'
function addScore() {
  if (flag === 0) return;
  console.log(typeof score.textContent);
  score[activePlayer].textContent =
    Number(score[activePlayer].textContent) + value_CurrentScore;
  if (score[activePlayer].textContent >= 10) {
    name[activePlayer].textContent = `Player ${Number(activePlayer + 1)} Wins!`;
    player[activePlayer].classList.add('player--winner');
    value_CurrentScore = 0;
    player[activePlayer].classList.remove('player--active');
    activePlayer ^= 1;
    player[activePlayer].classList.add('player--active');
    name[activePlayer].textContent = `Player ${Number(activePlayer + 1)} Lose!`;
    flag = 0;
    return;
  }
  value_CurrentScore = 0;
  player[activePlayer].classList.remove('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer ^= 1;
  player[activePlayer].classList.add('player--active');
}
buttonHold.addEventListener('click', addScore);
