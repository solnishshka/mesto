export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_visible",
};

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");

export const popupProfile = document.querySelector(".popup_theme_edit-profile");
export const popupCard = document.querySelector(".popup_theme_add-card");
export const popupPreview = document.querySelector(
  ".popup_theme_preview-image"
);

export const closeButtonProfile = popupProfile.querySelector(
  ".popup__close-button"
);
export const closeButtonCard = popupCard.querySelector(".popup__close-button");
export const closeButtonPreview = popupPreview.querySelector(
  ".popup__close-button"
);

export const cardContainer = document.querySelector(".elements");

export const formElementProfile = popupProfile.querySelector(".form");
export const formElementCard = popupCard.querySelector(".form");

export const nameInput = formElementProfile.querySelector(
  ".form__item_el_name"
);
export const jobInput = formElementProfile.querySelector(
  ".form__item_el_position"
);
export const cardTitle = formElementCard.querySelector(".form__item_el_title");
export const cardLink = formElementCard.querySelector(".form__item_el_link");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

export const cardTemplate = document.querySelector("#card").content;
