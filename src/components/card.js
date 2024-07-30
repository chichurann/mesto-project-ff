// card.js
import { deleteCard, putLikeOnCard, deleteLikeOnCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// Функция рендер карточки
export function renderCard(
  card,
  getProfileAndCards,
  handleImageClick,
  profileId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeAmount = cardElement.querySelector(".card__like-amount");

  // Устанавливаем значения из объекта card
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeAmount.textContent = card.likes.length;

  // Проверка владельца карточки для показа корзины
  if (profileId !== card.owner._id) {
    deleteButton.classList.toggle("card__delete-button_is-disable");
  }

  // Проверка стоит ли лайк от пользователя
  if (card.likes.find((likeInfo) => likeInfo._id === profileId)) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  // Открытие попапа с изображением при клике на картинку карточки
  cardImage.addEventListener("click", () => {
    handleImageClick(card);
  });

  // Обработчик события удаления карточки
  deleteButton.addEventListener("click", () => {
    deleteCard(card._id)
      .then(() => {
        getProfileAndCards();
      })
      .catch((error) => console.error("Ошибка при удалении карточки:", error));
  });

  // Обработчик события лайка карточки
  likeButton.addEventListener("click", () => {
    if (!card.likes.find((likeInfo) => likeInfo._id === profileId)) {
      putLikeOnCard(card._id)
        .then(() => {
          getProfileAndCards();
        })
        .catch((error) => console.error("Ошибка при лайке:", error));
    } else {
      deleteLikeOnCard(card._id)
        .then(() => {
          getProfileAndCards();
        })
        .catch((error) => console.error("Ошибка при снятии лайка:", error));
    }
  });

  return cardElement;
}
