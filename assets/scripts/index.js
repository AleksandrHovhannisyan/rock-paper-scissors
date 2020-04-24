const selectableHandsContainer = document.querySelector('.selectable-hands');
const selectableHands = selectableHandsContainer.querySelectorAll('.hand');
selectableHands.forEach((hand) => hand.addEventListener('click', onHandClicked));

const handNames = Array.from(selectableHands).map((hand) => hand.getAttribute('data-hand'));

const playedHandsContainer = document.querySelector('.played-hands');
const playerHandElement = document.querySelector('#player-hand .hand');
const houseHandElement = document.querySelector('#house-hand .hand');

const scoreElement = document.getElementById('score');
const resultElement = document.querySelector('.result');
const resultText = document.getElementById('result-text');
const playAgainButton = document.getElementById('play-again');
playAgainButton.addEventListener('click', startNewRound);

const rulesModal = document.querySelector('.rules .modal-wrapper');
const closeModalButton = document.querySelector('#close-modal-button');
const rulesButton = document.getElementById('rules-button');

function startNewRound() {
  toggleVisibilityOf(selectableHandsContainer);
  toggleVisibilityOf(playedHandsContainer);
  toggleVisibilityOf(resultElement);
  showPlayerHand('placeholder');
  showHouseHand('placeholder');
}

function toggleVisibilityOf(element) {
  element.classList.toggle('hidden');
}

function pickRandomHouseHand() {
  return handNames[Math.floor(Math.random() * handNames.length)];
}

function getResult(playerHand, houseHand) {
  if (playerHand === houseHand) {
    return { scoreChange: 0, feedback: 'TIE GAME' };
  }

  const handBeatenBy = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock',
  };

  if (handBeatenBy[playerHand] === houseHand) {
    return { scoreChange: 1, feedback: 'YOU WIN' };
  }

  return { scoreChange: -1, feedback: 'YOU LOSE' };
}

function onHandClicked(clickEvent) {
  const clickedHand = clickEvent.target;
  const playerHand = clickedHand.getAttribute('data-hand');
  const houseHand = pickRandomHouseHand();
  evaluateRoundResult(playerHand, houseHand);
}

function showPlayerHand(playerHand) {
  playerHandElement.className = `hand ${playerHand}`;
}

function showHouseHand(houseHand) {
  houseHandElement.className = `hand ${houseHand}`;
}

function changeScoreBy(value) {
  scoreElement.innerHTML = Number(scoreElement.innerHTML) + value;
}

function highlightWinningHand(winner) {
  document.querySelector(`#${winner} .hand`).classList.add('winning-hand');
}

function evaluateRoundResult(playerHand, houseHand) {
  toggleVisibilityOf(selectableHandsContainer);
  toggleVisibilityOf(playedHandsContainer);

  setTimeout(() => showPlayerHand(playerHand), 500);
  setTimeout(() => showHouseHand(houseHand), 1000);
  setTimeout(() => {
    toggleVisibilityOf(resultElement);
    const result = getResult(playerHand, houseHand);
    resultText.innerHTML = result.feedback;
    changeScoreBy(result.scoreChange);

    // Anything but a tie
    if (result.scoreChange) {
      let winner;

      if (result.scoreChange === 1) {
        winner = 'player-hand';
      } else {
        winner = 'house-hand';
      }

      highlightWinningHand(winner);
    }
  }, 1500);
}

function openRulesModal() {
  rulesModal.classList.add('opened');
}

function closeRulesModal() {
  rulesModal.classList.remove('opened');
}

rulesButton.addEventListener('click', () => {
  openRulesModal();
});

closeModalButton.addEventListener('click', () => {
  closeRulesModal();
});
