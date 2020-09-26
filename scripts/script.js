const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_theme_edit-profile');
const popupCard = document.querySelector('.popup_theme_add-card');
const popupPreview = document.querySelector('.popup_theme_preview-image');

const closeButtonProfile = popupProfile.querySelector('.popup__close-button');
const closeButtonCard = popupCard.querySelector('.popup__close-button');
const closeButtonPreview = popupPreview.querySelector('.popup__close-button');

const cardContainer = document.querySelector('.elements');
const previewContainer = document.querySelector('.popup__container_theme_preview-image');

const formElementProfile = popupProfile.querySelector('.form');
const formElementCard = popupCard.querySelector('.form');

const nameInput = formElementProfile.querySelector('.form__item_el_name');
const jobInput = formElementProfile.querySelector('.form__item_el_position');
const cardTitle = formElementCard.querySelector('.form__item_el_title');
const cardLink = formElementCard.querySelector('.form__item_el_link');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardTemplate = document.querySelector('#card').content;

function handleLikeIcon (evt) {
    evt.target.classList.toggle('element__like-button_liked');
  }

function deleteCard (evt) {
    evt.target.closest('.element').remove();
}

function openPreview(name, link) {
    const popupImage = popupPreview.querySelector('.popup__image');
    const popupCapture = popupPreview.querySelector('.popup__capture');

    popupImage.src = link;
    popupImage.alt = 'Фотография местности: ' + name;
    popupCapture.textContent = name;

    openPopup(popupPreview);
}

function createNewCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');

    cardElement.querySelector('.element__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = 'На карточке изображено: ' + name;

    cardElement.querySelector('.element__like-button').addEventListener('click', handleLikeIcon);

    cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);

    cardImage.addEventListener('click', function(evt){
        openPreview(name, link);
    });

    return cardElement;
}

function renderCards() {
    initialCards.forEach(item => {cardContainer.append(createNewCard(item.name, item.link)); }       
    )    
}

function openPopup (popupName) {
    popupName.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupPressEscape);
}

function closePopup (popupName) {
    popupName.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupPressEscape);
}

function handleSubmitProfile (evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closePopup(popupProfile);
}

function handleSubmitCard (evt) {
    evt.preventDefault();
    
    cardContainer.prepend(createNewCard(cardTitle.value, cardLink.value));

    closePopup(popupCard);

    formElementCard.reset();
}

function closePopupClickOverlay (evt) {
    if (evt.target !== evt.currentTarget) {
        return
      }

    closePopup(evt.target);

    if (evt.target === popupCard) {
        formElementCard.reset();
    }
}

function closePopupPressEscape (evt) {
    if (evt.key === 'Escape') {
        switch (document.querySelector('.popup_opened')) {
            case popupCard :
                closePopup(popupCard);
                formElementCard.reset();
                break;
            case popupProfile :
                closePopup(popupProfile);
                break;
            case popupPreview :
                closePopup(popupPreview);
                break;
        }
    }
}

renderCards();

editButton.addEventListener('click', function () {
    if (!popupProfile.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;    
    }
    openPopup(popupProfile);
});

addButton.addEventListener('click', function () {
    openPopup(popupCard);
});

closeButtonProfile.addEventListener('click', function () {
    closePopup(popupProfile);
});

closeButtonCard.addEventListener('click', function () {
    closePopup(popupCard);
    formElementCard.reset();
});

closeButtonPreview.addEventListener('click', function () {
    closePopup(popupPreview);
});

formElementProfile.addEventListener('submit', handleSubmitProfile);
formElementCard.addEventListener('submit', handleSubmitCard);

popupPreview.addEventListener('click', closePopupClickOverlay);
popupProfile.addEventListener('click', closePopupClickOverlay);
popupCard.addEventListener('click', closePopupClickOverlay);

