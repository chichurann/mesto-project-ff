// validation.js
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, disabledClass) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(disabledClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(disabledClass);
      buttonElement.disabled = false;
  }
};

const showInputError = (formElement, inputElement, validationCfg, errorMessage) => {
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
      errorElement.textContent = '';
  }
};

const checkInputValidity = (formElement, inputElement, validationCfg) => {
  const errorMessage = inputElement.dataset.errorMessage;
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(errorMessage);
  } else {
      inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationCfg, inputElement.validationMessage);
  } else {
      hideInputError(formElement, inputElement, validationCfg);
  }
};

function enableValidation(validationCfg) {
  const formList = Array.from(document.querySelectorAll(validationCfg.formSelector));

  formList.forEach((formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(validationCfg.inputSelector));
      const buttonElement = formElement.querySelector(validationCfg.submitButtonSelector);

      toggleButtonState(inputList, buttonElement, validationCfg.inactiveButtonClass);

      inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
              checkInputValidity(formElement, inputElement, validationCfg);
              toggleButtonState(inputList, buttonElement, validationCfg.inactiveButtonClass);
          });
      });
  });
}

const clearValidation = (form, validationCfg) => {
  const inputList = Array.from(form.querySelectorAll(validationCfg.inputSelector));
  const buttonElement = form.querySelector(validationCfg.submitButtonSelector);

  inputList.forEach((inputElement) => {
      hideInputError(form, inputElement, validationCfg);
  });
  toggleButtonState(inputList, buttonElement, validationCfg.inactiveButtonClass);
};

export { enableValidation, clearValidation, hasInvalidInput, toggleButtonState };