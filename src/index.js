// index.js
import "./pages/index.css";
import { renderCard, onDeleteCard, onLike } from "./components/card.js";
import {
  openPopup,
  closePopup,
  handleOverlayClick,
} from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  toggleButtonState,
  checkFormValidity,
} from "./components/validation.js";
import {
  updateAvatar,
  getProfileInfo,
  updateProfile,
  getInitialCards,
  createCard,
} from "./components/api";

export const localData = {
  userData: {},
  cardsData: [],
};

function handleImageClick(card) {
  const popupImage = document.querySelector(".popup_type_image");
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");

  popupImageElement.src = card.link;
  popupImageElement.alt = card.name;
  popupCaption.textContent = card.name;

  openPopup(popupImage);
}

// Первоначальная загрузка страницы
document.addEventListener("DOMContentLoaded", () => {
  let profileId = null;
  const profileAvatarContainer = document.querySelector(
    ".profile__avatar-container"
  );

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const placesList = document.querySelector(".places__list");

  Promise.all([getProfileInfo(), getInitialCards()])
    .then(([profileData, initialCards]) => {
      localData.userData = profileData;
      profileAvatarContainer.querySelector(
        ".profile__image"
      ).style.backgroundImage = `url(${profileData.avatar})`;
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      initialCards.forEach((card) => {
        // Проверка на корректность данных карточек
        if (card && card.name && card.link) {
          const cardElement = renderCard(
            card,
            handleImageClick,
            localData.userData._id,
            onDeleteCard,
            onLike
          );
          placesList.append(cardElement);
        } else {
          console.error("Некорректные данные карточки", card);
        }
      });
    })
    .catch((error) =>
      console.error(
        "Ошибка при получении данных пользователя или карточек:",
        error
      )
    );

  // Конфигурация валидации
  const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_visible",
  };

  enableValidation(validationSettings);

  initializeModals(validationSettings);
});

function initializeModals(validationSettings) {
  const editProfileButton = document.querySelector(".profile__edit-button");
  const addPlaceButton = document.querySelector(".profile__add-button");
  const avatarEditButton = document.querySelector(".profile__image");
  const closeButtons = document.querySelectorAll(".popup__close");
  const popups = document.querySelectorAll(".popup");

  const profileAvatarContainerOverlay = document.querySelector(
    ".profile__avatar-container-overlay"
  );

  const popupEditProfile = document.querySelector(".popup_type_edit");
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const popupEditAvatar = document.querySelector(".popup_type_edit_avatar");

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const formEditProfile = popupEditProfile.querySelector(".popup__form");
  const formNewCard = popupNewCard.querySelector(".popup__form");
  const formEditAvatar = popupEditAvatar.querySelector(".popup__form");

  const nameInput = formEditProfile.querySelector(".popup__input_type_name");
  const jobInput = formEditProfile.querySelector(
    ".popup__input_type_description"
  );
  const avatarInput = formEditAvatar.querySelector(".popup__input_type_url");
  const cardNameInput = formNewCard.querySelector(".popup__input_type_name");
  const cardLinkInput = formNewCard.querySelector(".popup__input_type_url");

  const submitButton = formEditProfile.querySelector(
    validationSettings.submitButtonSelector
  );

  // Открытие попапа для редактирования профиля
  editProfileButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationSettings); // Очистка ошибок
    openPopup(popupEditProfile);
  });

  // Форма редактирования профиля
  formEditProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    evt.submitter.textContent = "Сохранение...";

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    updateProfile(nameValue, jobValue)
      .then(() => {
        profileName.textContent = nameValue;
        profileDescription.textContent = jobValue;
        closePopup(popupEditProfile);
      })
      .catch((error) => console.error("Ошибка при обновлении профиля:", error))
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  });

  // Открытие попапа для редактирования аватарки
  profileAvatarContainerOverlay.addEventListener("click", () => {
    formEditAvatar.reset(); // Сброс формы
    clearValidation(formEditAvatar, validationSettings); // Очистка ошибок
    openPopup(popupEditAvatar);
    const buttonElement = formEditAvatar.querySelector(
      validationSettings.submitButtonSelector
    );
    toggleButtonState([avatarInput], buttonElement, validationSettings);
  });

  // Форма редактирования аватарки
  formEditAvatar.addEventListener("submit", (evt) => {
    evt.preventDefault();
    evt.submitter.textContent = "Сохранение...";

    const avatarValue = avatarInput.value;

    updateAvatar(avatarValue)
      .then(() => {
        const profileAvatarEditButton =
          document.querySelector(".profile__image");
        profileAvatarEditButton.style.backgroundImage = `url(${avatarValue})`;
        closePopup(popupEditAvatar);
      })
      .catch((error) => console.error("Ошибка при обновлении аватара:", error))
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  });

  //
  addPlaceButton.addEventListener("click", () => {
    formNewCard.reset(); // Сброс формы
    clearValidation(formNewCard, validationSettings); // Очистка ошибок
    openPopup(popupNewCard);
    const buttonElement = formNewCard.querySelector(
      validationSettings.submitButtonSelector
    );
    toggleButtonState(
      [cardNameInput, cardLinkInput],
      buttonElement,
      validationSettings
    );
  });

  // Закрытие попапов
  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const popup = event.target.closest(".popup");
      closePopup(popup);
    });
  });

  //  Создание и добавление новой карточки
  formNewCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    evt.submitter.textContent = "Сохранение...";

    const placesList = document.querySelector(".places__list");
    const nameValue = cardNameInput.value;
    const linkValue = cardLinkInput.value;

    createCard(nameValue, linkValue)
      .then((res) => {
        placesList.prepend(
          renderCard(
            res,
            handleImageClick,
            localData.userData._id,
            onDeleteCard,
            onLike
          )
        );
        closePopup(popupNewCard);
      })
      .catch((error) => console.error("Ошибка при добавлении карточки:", error))
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  });

  popups.forEach((popup) => {
    popup.addEventListener("click", handleOverlayClick);
  });

  [nameInput, jobInput].forEach((input) => {
    input.addEventListener("input", () => {
      checkFormValidity(formEditProfile, validationSettings);
    });
  });

  [cardNameInput, cardLinkInput].forEach((input) => {
    input.addEventListener("input", () => {
      checkFormValidity(formNewCard, validationSettings);
    });
  });

  avatarInput.addEventListener("input", () => {
    checkFormValidity(formEditAvatar, validationSettings);
  });
}
