import { createCard } from './card.js';

// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  popup.classList.remove('popup_is-closed');
}

// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-closed');
}

// Функция-обработчик события нажатия Esc
export function handleEscClose(event) {
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

// Инициализация модальных окон
export function initializeModals() {
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

  // Добавляем глобальные обработчики для закрытия попапа при нажатии Esc
  document.addEventListener('keydown', handleEscClose);

  // Обработчик отправки формы редактирования профиля
  function handleFormSubmit(evt) {
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
  formEditProfile.addEventListener('submit', handleFormSubmit);

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
