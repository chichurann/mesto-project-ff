// @todo: Темплейт карточки

// клонируем содержимое тега template

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', card.link);
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.setAttribute('alt', card.name);
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCard(cardElement);
  })
  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function renderCards(cards) {
  const cardsContainer = document.querySelector('.places__list');

  cards.forEach( cardData => {
    cardsContainer.appendChild(createCard(cardData, deleteCard));
  })
}

renderCards(initialCards);

