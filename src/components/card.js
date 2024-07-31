// card.js
import { deleteCard, putLikeOnCard, deleteLikeOnCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

const changeLikeElement = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

const onDeleteCard = (cardElement, card) => {
  deleteCard(card._id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const onLike = (card, likeButton, likeAmount) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    deleteLikeOnCard(card._id)
      .then((res) => {
        likeAmount.textContent = res.likes.length || 0;
        changeLikeElement(likeButton);
        return res;
      })
      .catch((error) => console.error("Ошибка при снятии лайка:", error));
  } else {
    putLikeOnCard(card._id)
      .then((res) => {
        likeAmount.textContent = res.likes.length || 0;
        changeLikeElement(likeButton);
        return res;
      })
      .catch((error) => console.error("Ошибка при лайке:", error));
  }
};

// Функция рендер карточки
const renderCard = (
  card,
  handleImageClick,
  profileId,
  onDeleteCard,
  onLike
) => {
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
    onDeleteCard(cardElement, card);
  });

  // Обработчик события лайка карточки
  likeButton.addEventListener("click", () => {
    onLike(card, likeButton, likeAmount);
  });

  return cardElement;
};

export { renderCard, onDeleteCard, onLike };
