export default class Card {
  constructor({link, name}, formSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._formSelector = formSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.innerHTML = "";
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
        this._handleCardClick();
      });
  }
}
