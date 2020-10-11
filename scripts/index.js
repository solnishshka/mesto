import {
  initialCards,
  editButton,
  addButton,
  popupProfile,
  popupCard,
  popupPreview,
  closeButtonCard,
  closeButtonPreview,
  closeButtonProfile,
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

export function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupPressEscape);
}

export function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupPressEscape);
  if (document.querySelectorAll(".form__item_type_error")) {
    document.querySelectorAll(".form__item_type_error").forEach((errorItem) => {
      errorItem.classList.remove("form__item_type_error");
      document.querySelector(`#${errorItem.id}-error`).textContent = "";
      document
        .querySelector(`#${errorItem.id}-error`)
        .classList.remove("form__item-error_visible");
    });
  }
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

function closePopupClickOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  closePopup(evt.target);

  if (evt.target === popupCard) {
    formElementCard.reset();
  }
}

function closePopupPressEscape(evt) {
  if (evt.key === "Escape") {
    switch (document.querySelector(".popup_opened")) {
      case popupCard:
        closePopup(popupCard);
        formElementCard.reset();
        break;
      case popupProfile:
        closePopup(popupProfile);
        break;
      case popupPreview:
        closePopup(popupPreview);
        break;
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

closeButtonProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});

closeButtonCard.addEventListener("click", function () {
  closePopup(popupCard);
  formElementCard.reset();
});

closeButtonPreview.addEventListener("click", function () {
  closePopup(popupPreview);
});

formElementProfile.addEventListener("submit", handleSubmitProfile);
formElementCard.addEventListener("submit", handleSubmitCard);

popupPreview.addEventListener("click", closePopupClickOverlay);
popupProfile.addEventListener("click", closePopupClickOverlay);
popupCard.addEventListener("click", closePopupClickOverlay);

const editFormValidator = new FormValidator(config, ".form_type_edit-form");
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, ".form_type_add-form");
addFormValidator.enableValidation();
