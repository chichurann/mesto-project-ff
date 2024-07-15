import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, handleLikeClick } from './components/card.js';
import { openPopup, closePopup, handleOverlayClick } from './components/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeModals();
  renderCards(initialCards, handleImageClick);
});

function renderCards(cards, handleImageClick) {
  const cardsContainer = document.querySelector('.places__list');
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard, handleLikeClick, handleImageClick);
    cardsContainer.appendChild(cardElement);
  });
}

function handleImageClick(card) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');

  popupImageElement.src = card.link;
  popupImageElement.alt = card.name;
  popupCaption.textContent = card.name;

  openPopup(popupImage);
}

// Инициализация модальных окон
function initializeModals() {
  const editProfileButton = document.querySelector('.profile__edit-button');
  const addPlaceButton = document.querySelector('.profile__add-button');
  const closeButtons = document.querySelectorAll('.popup__close');
  const popups = document.querySelectorAll('.popup');

  const popupEditProfile = document.querySelector('.popup_type_edit');
  const popupNewCard = document.querySelector('.popup_type_new-card');

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  // Находим форму в DOM
  const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
  const formNewCard = document.querySelector('.popup__form[name="new-place"]');

  // Находим поля формы в DOM
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  const cardNameInput = document.querySelector('.popup__input_type_card-name');
  const cardLinkInput = document.querySelector('.popup__input_type_url');

  // Добавляем обработчики событий для открытия попапов
  editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile);
  });

  addPlaceButton.addEventListener('click', () => openPopup(popupNewCard));

  // Добавляем обработчики событий для закрытия попапов
  closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const popup = event.target.closest('.popup');
      closePopup(popup);
    });
  });

  // Закрытие попапа при клике на затемнённую область
  popups.forEach(popup => {
    popup.addEventListener('click', handleOverlayClick);
  });

  // Обработчик отправки формы редактирования профиля
  function editProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileNameElement = document.querySelector('.profile__title');
    const profileJobElement = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    profileNameElement.textContent = nameValue;
    profileJobElement.textContent = jobValue;

    // Закрыть попап после сохранения
    closePopup(popupEditProfile);
  }

  // Прикрепляем обработчик к форме:
  formEditProfile.addEventListener('submit', editProfile);

  // Обработчик «отправки» формы добавления новой карточки
  function handleNewCardSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей cardNameInput и cardLinkInput из свойства value
    const cardNameValue = cardNameInput.value;
    const cardLinkValue = cardLinkInput.value;

    // Создайте новую карточку
    const newCard = { name: cardNameValue, link: cardLinkValue };
    const cardElement = createCard(newCard);

    // Добавьте новую карточку в начало списка
    document.querySelector('.places__list').prepend(cardElement);

    // Очистите форму
    formNewCard.reset();

    // Закройте попап после добавления карточки
    closePopup(popupNewCard);
  }

  // Прикрепляем обработчик к форме:
  formNewCard.addEventListener('submit', handleNewCardSubmit);
}



