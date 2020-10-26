export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableSaveButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _toggleSubmitButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSaveButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleSubmitButtonState(inputList);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState(inputList);
      });
    });
  }

  clearForm() {
    const errorItems = this._formElement.querySelectorAll(`.${this._inputErrorClass}`);
    if (errorItems) {
      errorItems.forEach((errorItem) => {
        this._hideInputError(errorItem);
      });
      this._disableSaveButton();
    }
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._disableSaveButton();
    });

    this._setEventListeners();
  }
}
