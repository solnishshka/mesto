import "./index.css";

import {
  editButton,
  addButton,
  editAvatarButton,
  popupProfileSelector,
  popupCardSelector,
  popupPreviewSelector,
  popupAvatarSelector,
  popupApplyDeleteSelector,
  profileSelector,
  formElementProfile,
  formElementCard,
  formElementAvatar,
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
import Api from "../components/Api";
import PopupApplyDelete from "../components/PopupApplyDelete";

const defaultCards = new Section(
  {
    data: [],
    renderer: (item) => {
      defaultCards.addItem(createCard(item));
    },
  },
  cardContainerSelector
);

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "159d2343-af0f-47ed-9479-4499ffedf0da",
    "Content-Type": "application/json",
  },
});

const userData = new UserInfo(profileSelector);

const popupDeleteApply = new PopupApplyDelete(popupApplyDeleteSelector);
const popupPreview = new PopupWithImage(popupPreviewSelector);

const profileFormValidator = new FormValidator(config, formElementProfile);
const cardFormValidator = new FormValidator(config, formElementCard);
const avatarFormValidator = new FormValidator(config, formElementAvatar);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userData.getUserInfo(data);
    cards.forEach((card) => {
      defaultCards.addItem(createCard(card));
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    userData.setUserInfo();
  });

function updateUserInfo() {
  api
    .getUserInfo()
    .then((data) => {
      userData.getUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      userData.setUserInfo();
    });
}

function changeLikeStatus(id, isLike, card) {
  if (isLike) {
    api
      .deleteLike(id)
      .then((res) => {
        card.like = res.likes.length;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        card.isLike = false;
        card.handleLikeIcon();
      });
  } else {
    api
      .setLike(id)
      .then((res) => {
        card.like = res.likes.length;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        card.isLike = true;
        card.handleLikeIcon();
      });
  }
}

function createCard(cardData) {
  if (cardData.likes.length !== 0) {
    cardData.likes.forEach((like) => {
      if (like._id === userData.id) {
        cardData.isLike = true;
      } else {
        cardData.isLike = false;
      }
    });
  } else {
    cardData.isLike = false;
  }

  cardData.isMy = true;
  if (cardData.owner) {
    if (cardData.owner._id !== userData.id) {
      cardData.isMy = false;
    } else {
      cardData.isMy = true;
    }
  }

  const card = new Card(
    cardData,
    "#card",
    () => {
      popupPreview.open(cardData);
    },
    (id) => {
      popupDeleteApply.open();
      popupDeleteApply.setSubmitCallback(() => {
        api
          .deleteCard(id)
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            card.deleteCard();
            popupDeleteApply.close();
          });
      });
    },
    (id, isLike) => {
      changeLikeStatus(id, isLike, card);
    }
  );
  return card.createNewCard();
}

function renderLoadingProfile(isLoading, popupSelector) {
  const submitButton = document
    .querySelector(popupSelector)
    .querySelector(".form__submit-button");

  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    if (
      popupSelector === popupProfileSelector ||
      popupSelector === popupAvatarSelector
    ) {
      submitButton.textContent = "Сохранить";
    } else {
      submitButton.textContent = "Создать";
    }
  }
}

const popupCard = new PopupWithForm(popupCardSelector, () => {
  const cardData = popupCard.getInputValues();
  renderLoadingProfile(true, popupCardSelector);
  api
    .addNewCard(cardData)
    .then((card) => {
      defaultCards.addItem(createCard(card));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProfile(false, popupCardSelector);
      popupCard.close();
    });
});

const popupProfile = new PopupWithForm(popupProfileSelector, () => {
  renderLoadingProfile(true, popupProfileSelector);
  api
    .setUserInfo(popupProfile.getInputValues())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProfile(false, popupProfileSelector);
      popupProfile.close();
      updateUserInfo();
    });
});

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, () => {
  renderLoadingProfile(true, popupAvatarSelector);
  api
    .setUserAvatar(popupEditAvatar.getInputValues())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingProfile(false, popupAvatarSelector);
      popupEditAvatar.close();
      updateUserInfo();
    });
});

popupCard.setEventListeners();
popupPreview.setEventListeners();
popupProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteApply.setEventListeners();

editButton.addEventListener("click", () => {
  profileFormValidator.clearForm();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupProfile.open();
});

addButton.addEventListener("click", function () {
  cardFormValidator.clearForm();
  popupCard.open();
});

editAvatarButton.addEventListener("click", function () {
  avatarFormValidator.clearForm();
  popupEditAvatar.open();
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
