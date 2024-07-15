import './pages/index.css';
import { initializeModals } from './components/modal.js';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, handleLikeClick } from './components/card.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeModals();
  renderCards(initialCards);
});

function renderCards(cards) {
  const cardsContainer = document.querySelector('.places__list');
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard, handleLikeClick);
    cardsContainer.appendChild(cardElement);
  });
}
