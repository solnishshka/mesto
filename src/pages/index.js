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
  cardContainerSelector
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

popupDeleteApply.setEventListeners();

function renderUserData() {
  api.getUserInfo()
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => {
      userData.getUserInfo(data);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      userData.setUserInfo();
    });
}

renderUserData();

function renderInitialCards() {
  api.getInitialCards()
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((cards) => {
        cards.forEach((card) => {
          defaultCards.addItem(createCard(card));
        })
    })
    .catch((err) => {
      console.log(err);
    });
}

renderInitialCards();

function createCard(cardData) {
  if (cardData.likes.length !== 0) {
    cardData.likes.forEach((like) => {
      if (like._id === userData.id) {
        cardData.isLike = true;
      }
      else {
        cardData.isLike = false;
      }
    });
  }
  else {
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
        api.deleteCard(id)
          .then((result) => {
            if (result.ok) {
              return result.json();
            } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            card.deleteCard();
            popupDeleteApply.close();
          })
      })   
    },
    (id, isLike) => {
      console.log(card);
      changeLikeInfo(id, isLike, card);
    }
  );
  return card.createNewCard();
}

function changeLikeInfo (id, isLike, card) {
  if (isLike) {
    api.deleteLike(id)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((res) => {
        card.like = res.likes.length;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        card.isLike = false;
        card.handleLikeIcon();
      })
  }
  else {
    api.setLike(id)
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((res) => {
        card.like = res.likes.length;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        card.isLike = true;
        card.handleLikeIcon();
      })
  }
}

const profileFormValidator = new FormValidator(config, formElementProfile);
const cardFormValidator = new FormValidator(config, formElementCard);
const avatarFormValidator = new FormValidator(config, formElementAvatar);

const popupPreview = new PopupWithImage(popupPreviewSelector);

const popupCard = new PopupWithForm(popupCardSelector, () => {
  const cardData = popupCard.getInputValues();

  api.addNewCard(cardData)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((card) => {
      defaultCards.addItem(createCard(card));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.close();
    }); 
});

const popupProfile = new PopupWithForm(popupProfileSelector, () => {
  api.setUserInfo(popupProfile.getInputValues())
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupProfile.close();
    renderUserData();
  });
});

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, () => {
  api.setUserAvatar(popupEditAvatar.getInputValues())
  .then((result) => {
    if (result.ok) {
      return result.json();
    } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupEditAvatar.close();
    renderUserData();
  });
});

//добавляем слушатели для попапов
popupCard.setEventListeners();
popupPreview.setEventListeners();
popupProfile.setEventListeners();
popupEditAvatar.setEventListeners();

//добавляем слушатели для кнопок редактирования
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

//включаем валидацию для форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//api.changeLikeInfo('5fa92007fca8c000111d981f', true)
  //.then((res) => {
   //console.log(res);
  //})
