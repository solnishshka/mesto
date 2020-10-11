import { popupPreview, closeButtonPreview } from "./data.js";
import { closePopup, openPopup } from "./index.js";

class Card {
  constructor(data, formSelector) {
    this._name = data.name;
    this._link = data.link;
    this._formSelector = formSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._formSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  createNewCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector(".element__image");

    this._element.querySelector(".element__title").textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = "На карточке изображено: " + this._name;

    return this._element;
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_liked");
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPreview() {
    const popupImage = popupPreview.querySelector(".popup__image");
    const popupCapture = popupPreview.querySelector(".popup__capture");

    popupImage.src = this._link;
    popupImage.alt = "Фотография местности: " + this._name;
    popupCapture.textContent = this._name;

    openPopup(popupPreview);
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openPreview();
      });

    closeButtonPreview.addEventListener("click", () => {
      closePopup(popupPreview);
    });
  }
}

export default Card;
