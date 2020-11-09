export default class Card {
  constructor(
    { link, name, likes, isMy, _id, isLike },
    formSelector,
    handleCardClick,
    handleCardDelete,
    changeLikeButton
  ) {
    this._name = name;
    this._link = link;
    this.like = likes.length;
    this.isLike = isLike;
    this._isMy = isMy;
    this._id = _id;
    this._formSelector = formSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._changeLikeButton = changeLikeButton;
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
    this.handleLikeIcon();
    if (this._isMy) {
      this._element
        .querySelector(".element__delete-button")
        .classList.remove("element__delete-button_hidden");
    }

    return this._element;
  }

  handleLikeIcon() {
    const likeButton = this._element.querySelector(".element__like-button");

    if (this.isLike) {
      likeButton.classList.add("element__like-button_liked");
    } else {
      likeButton.classList.remove("element__like-button_liked");
    }

    this._element.querySelector(".element__like-count").textContent = this.like;
  }

  deleteCard() {
    this._element.remove();
    this._element.innerHTML = "";
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._changeLikeButton(this._id, this.isLike);
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });

    if (this._isMy) {
      this._element
        .querySelector(".element__delete-button")
        .addEventListener("click", () => {
          this._handleCardDelete(this._id);
        });
    }
  }
}
