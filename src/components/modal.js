// modal.js

import { createCard } from './card.js';

// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  popup.classList.remove('popup_is-closed');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-closed');
  document.removeEventListener('keydown', handleEscClose);
}

// Функция-обработчик события нажатия Esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция-обработчик события клика по оверлею
export function handleOverlayClick(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closePopup(event.target);
  }
}



