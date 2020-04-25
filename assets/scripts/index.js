const selectableHandsContainer = document.querySelector('.selectable-hands');
const selectableHands = selectableHandsContainer.querySelectorAll('.hand');
const handNames = Array.from(selectableHands).map((hand) => hand.getAttribute('data-hand'));

selectableHands.forEach((hand) => {
  hand.addEventListener('click', (clickEvent) => {
    onHandClicked(clickEvent.target);
  });
  hand.addEventListener('keyup', (keyEvent) => {
    if (keyEvent.key === 'Enter') {
      onHandClicked(keyEvent.target);
    }
  });
});

const playedHandsContainer = document.querySelector('.played-hands');
const playerHandElement = document.querySelector('#player-hand');
const playerPickedText = document.querySelector('#player-hand + .picked-text');
const houseHandElement = document.querySelector('#house-hand');
const housePickedText = document.querySelector('#house-hand + .picked-text');

const resultElement = document.querySelector('.result');
const resultText = document.getElementById('result-text');
const playAgainButton = document.getElementById('play-again');
playAgainButton.addEventListener('click', startNewRound);

function startNewRound() {
  toggleVisibilityOf(selectableHandsContainer);
  toggleVisibilityOf(playedHandsContainer);
  toggleVisibilityOf(resultElement);

  // clear these for the next round
  showPlayerHand('placeholder');
  showHouseHand('placeholder');
}

// .hidden applies display: none
function toggleVisibilityOf(element) {
  element.classList.toggle('hidden');
}

function pickRandomHouseHand() {
  return handNames[Math.floor(Math.random() * handNames.length)];
}

const handBeatenBy = {
  rock: 'scissors',
  scissors: 'paper',
  paper: 'rock',
};

function getResult(playerHand, houseHand) {
  if (playerHand === houseHand) {
    return { scoreChange: 0, winner: null, feedback: 'TIE GAME' };
  }

  if (handBeatenBy[playerHand] === houseHand) {
    return { scoreChange: 1, winner: 'player-hand', feedback: 'YOU WIN' };
  }

  return { scoreChange: -1, winner: 'house-hand', feedback: 'YOU LOSE' };
}

function onHandClicked(hand) {
  const playerHand = hand.getAttribute('data-hand');
  const houseHand = pickRandomHouseHand();
  evaluateRoundResult(playerHand, houseHand);
}

function showPlayerHand(playerHand) {
  playerHandElement.className = `hand ${playerHand}`;
  playerPickedText.setAttribute('aria-label', `You picked ${playerHand}`);
}

function showHouseHand(houseHand) {
  houseHandElement.className = `hand ${houseHand}`;
  housePickedText.setAttribute('aria-label', `The house picked ${houseHand}`);
}

const scoreElement = document.getElementById('score');
function changeScoreBy(value) {
  scoreElement.innerHTML = Number(scoreElement.innerHTML) + value;
}

function highlightWinningHand(winner) {
  document.getElementById(winner).classList.add('winning-hand');
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
    if (result.winner) {
      highlightWinningHand(result.winner);
    }
  }, 1500);
}

const rulesModalWrapper = document.querySelector('.rules .modal-wrapper');
const rulesModalWindow = rulesModalWrapper.querySelector('.modal-window');
const closeModalButton = document.querySelector('#close-modal-button');
const rulesButton = document.getElementById('rules-button');

function openRulesModal() {
  rulesModalWrapper.classList.add('opened');
}

function closeRulesModal() {
  rulesModalWrapper.classList.remove('opened');
}

document.addEventListener('keyup', (keyEvent) => {
  if (keyEvent.key === 'Escape') {
    // doesn't matter if it's not open because the classlist just won't remove anything
    closeRulesModal();
  }
});

rulesModalWindow.addEventListener('click', (clickEvent) => {
  clickEvent.stopPropagation();
});

rulesModalWrapper.addEventListener('click', () => {
  closeRulesModal();
});

rulesButton.addEventListener('click', () => {
  openRulesModal();
});

closeModalButton.addEventListener('click', () => {
  closeRulesModal();
});
