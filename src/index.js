// index.js
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, handleLikeClick } from './components/card.js';
import { openPopup, closePopup, handleOverlayClick } from './components/modal.js';
import { enableValidation, clearValidation, hasInvalidInput, toggleButtonState } from './components/validation.js';

// Конфигурация валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Включение валидации
enableValidation(validationSettings);

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

// Инициализация модальных окон и форм
function initializeModals() {
  const editProfileButton = document.querySelector('.profile__edit-button');
  const addPlaceButton = document.querySelector('.profile__add-button');
  const closeButtons = document.querySelectorAll('.popup__close');
  const popups = document.querySelectorAll('.popup');

  const popupEditProfile = document.querySelector('.popup_type_edit');
  const popupNewCard = document.querySelector('.popup_type_new-card');

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  const formEditProfile = popupEditProfile.querySelector('.popup__form');
  const formNewCard = popupNewCard.querySelector('.popup__form');

  const nameInput = formEditProfile.querySelector('.popup__input_type_name');
  const jobInput = formEditProfile.querySelector('.popup__input_type_description');

  const cardNameInput = formNewCard.querySelector('.popup__input_type_name');
  const cardLinkInput = formNewCard.querySelector('.popup__input_type_url');

  // Открытие попапа редактирования профиля
  editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationSettings); // Очистка ошибок
    openPopup(popupEditProfile);
  });

  // Открытие попапа добавления нового места
  addPlaceButton.addEventListener('click', () => {
    clearValidation(formNewCard, validationSettings); // Очистка ошибок
    openPopup(popupNewCard);
  });

  // Закрытие попапов
  closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const popup = event.target.closest('.popup');
      closePopup(popup);
    });
  });

  // Закрытие попапа при клике на затемненную область
  popups.forEach(popup => {
    popup.addEventListener('click', handleOverlayClick);
  });

  // Обработка отправки формы редактирования профиля
  formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(popupEditProfile);
  });

  formNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const cardNameValue = cardNameInput.value;
    const cardLinkValue = cardLinkInput.value;

    const newCard = { name: cardNameValue, link: cardLinkValue };
    const cardElement = createCard(newCard, deleteCard, handleLikeClick, handleImageClick);

    document.querySelector('.places__list').prepend(cardElement);

    formNewCard.reset();

    closePopup(popupNewCard);
  });

  // Обработка валидации при вводе в поля
  [nameInput, jobInput].forEach(input => {
    input.addEventListener('input', () => {
      checkFormValidity(formEditProfile);
    });
  });
}

function checkFormValidity(form) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = form.querySelector(validationSettings.submitButtonSelector);
  const isValid = !hasInvalidInput(inputList);
  
  toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass);
}