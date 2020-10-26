import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popup.querySelector(".form");
    this._inputList = this._formElement.querySelectorAll(".form__item");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input, i) => {
      inputValues[i] = input.value;
    });
    return inputValues;
  }

  _clearErrorValidation() {
    if (this._formElement.querySelectorAll(`.form__item_type_error`)) {
        this._formElement
          .querySelectorAll(`.form__item_type_error`)
          .forEach((errorItem) => {
            errorItem.classList.remove("form__item_type_error");
            document.querySelector(`#${errorItem.id}-error`).textContent = "";
            document
              .querySelector(`#${errorItem.id}-error`)
              .classList.remove("form__item-error_visible");
          });
      }
  }

  close() {
    super.close();
    this._formElement.reset();
    this._clearErrorValidation();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
  }
}
