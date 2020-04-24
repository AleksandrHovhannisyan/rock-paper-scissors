const playableHands = document.querySelectorAll('#playable-hands .hand');
const rulesModal = document.querySelector('.rules .modal-wrapper');
const closeModalButton = document.querySelector('#close-modal-button');
const rulesButton = document.getElementById('rules-button');

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
