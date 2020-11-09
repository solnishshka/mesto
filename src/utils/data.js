/*export const initialCards = [
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
];*/

export const config = {
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_visible",
};

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const editAvatarButton = document.querySelector(".profile__avatar");

export const popupProfileSelector = ".popup_theme_edit-profile";
export const popupCardSelector = ".popup_theme_add-card";
export const popupPreviewSelector = ".popup_theme_preview-image";
export const popupAvatarSelector = ".popup_theme_edit-avatar";
export const popupApplyDeleteSelector = ".popup_theme_apply-delete";

export const cardContainerSelector = ".elements";

export const formElementProfile = document
  .querySelector(popupProfileSelector)
  .querySelector(".form");
export const formElementCard = document
  .querySelector(popupCardSelector)
  .querySelector(".form");
export const formElementAvatar = document
  .querySelector(popupAvatarSelector)
  .querySelector(".form");

export const nameInput = formElementProfile.querySelector(
  ".form__item_el_name"
);
export const jobInput = formElementProfile.querySelector(
  ".form__item_el_position"
);

export const profileSelector = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar"
};

export const profileAvatar = document.querySelector('.profile__avatar');
