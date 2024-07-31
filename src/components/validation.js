// validation.js
const toggleButtonState = (inputs, button, validationSettings) => {
  const hasInvalidInput = inputs.some((input) => !input.validity.valid);
  if (hasInvalidInput) {
    button.classList.add(validationSettings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(validationSettings.inactiveButtonClass);
    button.disabled = false;
  }
};

const showInputError = (
  formElement,
  inputElement,
  validationCfg,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  if (errorElement) {
    inputElement.classList.add(validationCfg.inputErrorClass);
    errorElement.classList.add(validationCfg.errorClass);
    errorElement.textContent = errorMessage;
  }
};

const hideInputError = (formElement, inputElement, validationCfg) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  if (errorElement) {
    inputElement.classList.remove(validationCfg.inputErrorClass);
    errorElement.classList.remove(validationCfg.errorClass);
    errorElement.textContent = "";
  }
};

const checkInputValidity = (formElement, inputElement, validationCfg) => {
  const errorMessage = inputElement.dataset.errorMessage;
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      validationCfg,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, validationCfg);
  }
};

function enableValidation(validationCfg) {
  const formList = Array.from(
    document.querySelectorAll(validationCfg.formSelector)
  );

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationCfg.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationCfg.submitButtonSelector
    );

    toggleButtonState(
      inputList,
      buttonElement,
      validationCfg.inactiveButtonClass
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, validationCfg);
        toggleButtonState(
          inputList,
          buttonElement,
          validationCfg.inactiveButtonClass
        );
      });
    });
  });
}

const clearValidation = (form, validationCfg) => {
  const inputList = Array.from(
    form.querySelectorAll(validationCfg.inputSelector)
  );
  const buttonElement = form.querySelector(validationCfg.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, validationCfg);
  });
  toggleButtonState(
    inputList,
    buttonElement,
    validationCfg.inactiveButtonClass
  );
};

// Функция для проверки валидности формы
const checkFormValidity = (formElement, validationSettings) => {
  const inputs = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const button = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(inputs, button, validationSettings);
};

export {
  enableValidation,
  clearValidation,
  toggleButtonState,
  checkFormValidity,
};
