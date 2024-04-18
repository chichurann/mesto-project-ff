// @todo: Темплейт карточки

// клонируем содержимое тега template

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function addCard(card, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').setAttribute('src', card.link);
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').setAttribute('alt', card.name);
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', (del) => {
      deleteCard(del.target.parentElement);
  })
  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function showCards(cards) {
  const placeList = document.querySelector('.places__list');

  cards.forEach( tot => {
      placeList.appendChild(addCard(tot, deleteCard));
  })
}

showCards(initialCards);

