import {
  initialCards,
  editButton,
  addButton,
  popupProfileSelector,
  popupCardSelector,
  popupPreviewSelector,
  profileSelector,
  formElementProfile,
  formElementCard,
  nameInput,
  jobInput,
  config,
  cardContainerSelector,
} from "../utils/data.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

/*function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, "#card");
    cardContainer.append(card.createNewCard());
  });
}*/

const popupPreview = new PopupWithImage(popupPreviewSelector);

const userData = new UserInfo(profileSelector);

const defaultCards = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card", () => {
        popupPreview.open(item);
      });
      const cardElement = card.createNewCard();
      defaultCards.addItem(cardElement);
    },
  },
  cardContainerSelector
);

const popupCard = new PopupWithForm(popupCardSelector, () => {
  const cardData = {
    name: popupCard._getInputValues()[0],
    link: popupCard._getInputValues()[1],
  };
  const card = new Card(cardData, "#card", () => {
    popupPreview.open(cardData);
  });

  defaultCards.addItem(card.createNewCard());

  popupCard.close();
});

const popupProfile = new PopupWithForm(popupProfileSelector, () => {
  userData.setUserInfo(
    popupProfile._getInputValues()[0],
    popupProfile._getInputValues()[1]
  );
  popupProfile.close();
});

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

defaultCards.renderItems();
popupCard.setEventListeners();
popupPreview.setEventListeners();
popupProfile.setEventListeners();

editButton.addEventListener("click", () => {
  nameInput.value = userData.getUserInfo().name;
  jobInput.value = userData.getUserInfo().job;
  popupProfile.open();
});

addButton.addEventListener("click", function () {
  popupCard.open();
});

const profileFormValidator = new FormValidator(config, formElementProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formElementCard);
cardFormValidator.enableValidation();
