// card.js

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


// // card.js

// import { localData } from '../index';
// import { deleteCard, switchLikeCard } from './api';

// // Шаблон карточки
// const cardTemplate = document.querySelector('#card-template').content;

// // Функция для переключения состояния лайка
// const changeLikeElement = (likeButton) => {
//   likeButton.classList.toggle('card__like-button_is-active');
// };

// // Обработка удаления карточки
// const onDeleteCard = (cardElement, cardId) => {
//   deleteCard(cardId)
//     .then(() => {
//       cardElement.remove();
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// // Обработка лайка карточки
// const onLike = (cardElement, card) => {
//   const isLiked = cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active');
//   const likeAmount = cardElement.querySelector('.like__amount');
//   const likeButton = cardElement.querySelector('.card__like-button');

//   switchLikeCard(card._id, isLiked)
//     .then(res => {
//       likeAmount.textContent = res.likes.length || 0;
//       changeLikeElement(likeButton);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// // Создание карточки
// const createCard = (card, onDeleteCard, onLike, onImageClick) => {
//   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
//   const cardImage = cardElement.querySelector('.card__image');
//   const likeAmount = cardElement.querySelector('.like__amount');
//   const likeButton = cardElement.querySelector('.card__like-button');
//   const deleteButton = cardElement.querySelector('.card__delete-button');

//   // Условие для скрытия кнопки удаления, если карточка не принадлежит текущему пользователю
//   if (card.owner._id !== localData.userData._id) {
//     deleteButton.classList.add('card__delete-button-hidden');
//     deleteButton.disabled = true;
//   }

//   // Проверка, лайкнута ли карточка текущим пользователем
//   if (card.likes.some(like => like._id === localData.userData._id)) {
//     changeLikeElement(likeButton);
//   }

//   // Установка значений и добавление обработчиков событий
//   cardImage.src = card.link;
//   cardImage.alt = card.name;
//   cardElement.id = card._id;
//   likeAmount.textContent = card.likes.length || 0;
//   cardElement.querySelector('.card__title').textContent = card.name;

//   likeButton.addEventListener('click', () => onLike(cardElement, card));
//   deleteButton.addEventListener('click', () => onDeleteCard(cardElement, card._id));
//   cardImage.addEventListener('click', () => onImageClick(card));

//   return cardElement;
// };

// export { createCard, onLike, onDeleteCard };

