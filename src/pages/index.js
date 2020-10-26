import "./index.css";

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

function createCard(cardData) {
  const card = new Card(cardData, "#card", () => {
    popupPreview.open(cardData);
  });

  return card.createNewCard();
}

const profileFormValidator = new FormValidator(config, formElementProfile);
const cardFormValidator = new FormValidator(config, formElementCard);

const popupPreview = new PopupWithImage(popupPreviewSelector);

const userData = new UserInfo(profileSelector);

const defaultCards = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      defaultCards.addItem(createCard(item));
    },
  },
  cardContainerSelector
);

const popupCard = new PopupWithForm(popupCardSelector, () => {
  const cardData = popupCard._getInputValues();

  defaultCards.addItem(createCard(cardData));

  popupCard.close();
});

const popupProfile = new PopupWithForm(popupProfileSelector, () => {
  userData.setUserInfo(popupProfile._getInputValues());
  popupProfile.close();
});

defaultCards.renderItems();
popupCard.setEventListeners();
popupPreview.setEventListeners();
popupProfile.setEventListeners();

editButton.addEventListener("click", () => {
  profileFormValidator.clearForm();
  nameInput.value = userData.getUserInfo().name;
  jobInput.value = userData.getUserInfo().job;
  popupProfile.open();
});

addButton.addEventListener("click", function () {
  cardFormValidator.clearForm();
  popupCard.open();
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
