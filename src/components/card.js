// card.js старый

import { openPopup } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(card, deleteCard, handleLikeClick, handleImageClick) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Устанавливаем значения из объекта card
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  // Открытие попапа с изображением при клике на картинку карточки
  cardImage.addEventListener('click', () => {
    handleImageClick(card);
  });

  // Обработчик события удаления карточки
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  // Обработчик события лайка карточки
  likeButton.addEventListener('click', () => {
    handleLikeClick(likeButton);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// Функция обработки лайка
export function handleLikeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
