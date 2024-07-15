

// const cardTemplate = document.querySelector('#card-template').content;

// // Функция создания карточки
// export function createCard(card, deleteCard) {
//   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
//   const cardImage = cardElement.querySelector('.card__image');
//   cardImage.setAttribute('src', card.link);
//   cardElement.querySelector('.card__title').textContent = card.name;
//   cardImage.setAttribute('alt', card.name);
  
//   // Открытие попапа с изображением при клике на картинку карточки
//   cardImage.addEventListener('click', () => {
//     const popupImage = document.querySelector('.popup_type_image');
//     const popupImageElement = popupImage.querySelector('.popup__image');
//     const popupCaption = popupImage.querySelector('.popup__caption');
    
//     popupImageElement.src = card.link;
//     popupImageElement.alt = card.name;
//     popupCaption.textContent = card.name;
    
//     openPopup(popupImage);
//   });

//   // Обработчик события удаления карточки
//   cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
//     deleteCard(cardElement);
//   });

//   return cardElement;
// }

// // Функция удаления карточки
// export function deleteCard(card) {
//   card.remove();
// }

import { openPopup } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(card, deleteCard, handleLikeClick) {
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
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');
    
    popupImageElement.src = card.link;
    popupImageElement.alt = card.name;
    popupCaption.textContent = card.name;
    
    openPopup(popupImage);
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

