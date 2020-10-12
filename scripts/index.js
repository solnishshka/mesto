import {
  initialCards,
  editButton,
  addButton,
  popupProfile,
  popupCard,
  popupPreview,
  cardContainer,
  formElementProfile,
  formElementCard,
  nameInput,
  jobInput,
  cardTitle,
  cardLink,
  profileTitle,
  profileSubtitle,
  config,
} from "../scripts/data.js";

import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, "#card");
    cardContainer.append(card.createNewCard());
  });
}

function clearError() {
  if (document.querySelectorAll(`.${config.inputErrorClass}`)) {
    document
      .querySelectorAll(`.${config.inputErrorClass}`)
      .forEach((errorItem) => {
        errorItem.classList.remove(config.inputErrorClass);
        document.querySelector(`#${errorItem.id}-error`).textContent = "";
        document
          .querySelector(`#${errorItem.id}-error`)
          .classList.remove(config.errorClass);
      });
  }
}

export function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keyup", closePopupPressEscape);
}

export function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keyup", closePopupPressEscape);
  clearError();
}

function handleSubmitProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupProfile);
}

function handleSubmitCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardTitle.value,
    link: cardLink.value,
  };

  const card = new Card(cardData, "#card");

  cardContainer.prepend(card.createNewCard());

  closePopup(popupCard);

  formElementCard.reset();
}

function closePopupPressEscape(evt) {
  const popupOpen = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpen);
    if (popupOpen === popupCard) {
      formElementCard.reset();
    }
  }
}

renderCards();

editButton.addEventListener("click", function () {
  if (!popupProfile.classList.contains("popup_opened")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
  openPopup(popupProfile);
});

addButton.addEventListener("click", function () {
  openPopup(popupCard);
});

formElementProfile.addEventListener("submit", handleSubmitProfile);
formElementCard.addEventListener("submit", handleSubmitCard);

popupPreview.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(popupPreview);
  }
});

popupProfile.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(popupProfile);
  }
});

popupCard.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(popupCard);
    formElementCard.reset();
  }
});

const profileFormValidator = new FormValidator(config, formElementProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formElementCard);
cardFormValidator.enableValidation();
