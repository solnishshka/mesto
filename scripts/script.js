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

let formElementProfile = popupProfile.querySelector('.form');
let nameInput = formElementProfile.querySelector('.form__item_el_name');
let jobInput = formElementProfile.querySelector('.form__item_el_position');
let formElementCard = popupCard.querySelector('.form');
let cardTitle = formElementCard.querySelector('.form__item_el_title');
let cardLink = formElementCard.querySelector('.form__item_el_link');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

renderCards();

function createNewCard(name, link) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__image').src = link;

    cardElement.querySelector('.element__like-button').addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        
        eventTarget.classList.toggle('element__like-button_liked');
      });

    cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        const cardItem = evt.target.closest('.element');
        cardItem.remove();
    });

    cardElement.querySelector('.element__image').addEventListener('click', function(evt){
        openPreview(name, link);
    });

    return cardElement;
}

function renderCards() {
    const cardTemplate = document.querySelector('#card').content;
    initialCards.forEach(item => {cardContainer.append(createNewCard(item.name, item.link)); }       
    )    
}

const popupToggle = function(evt) {
    if (evt.target === editButton) {
        if (!popupProfile.classList.contains('popup_opened')) {
            nameInput.value = profileTitle.textContent;
            jobInput.value = profileSubtitle.textContent;    
        }

        popupProfile.classList.toggle('popup_opened');
    }

    else if (evt.target === addButton) {
        popupCard.classList.toggle('popup_opened');
    } 

    else if (evt.target === closeButtonProfile) {
        popupProfile.classList.toggle('popup_opened');
    }
    else if (evt.target === closeButtonCard) {
        popupCard.classList.toggle('popup_opened');
        cardTitle.value = "";
        cardLink.value = "";
    }
    else if (evt.target === closeButtonPreview) {
        popupPreview.classList.toggle('popup_opened');
    }
}

editButton.addEventListener('click', popupToggle);
addButton.addEventListener('click', popupToggle);

closeButtonProfile.addEventListener('click', popupToggle);
closeButtonCard.addEventListener('click', popupToggle);
closeButtonPreview.addEventListener('click', popupToggle);


function formSubmitHandler (evt) {
    evt.preventDefault();

    if (evt.target === formElementProfile) {
        profileTitle.textContent = nameInput.value;
        profileSubtitle.textContent = jobInput.value;

        popupProfile.classList.remove('popup_opened');
    }

    else if (evt.target === formElementCard) {
        cardContainer.prepend(createNewCard(cardTitle.value, cardLink.value));

        cardTitle.value = "";
        cardLink.value = "";

        popupCard.classList.remove('popup_opened');
    }
}


formElementProfile.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', formSubmitHandler);


const deleteButton = document.querySelector('.element__delete-button');


deleteButton.addEventListener('click', function (evt) {
    const cardItem = deleteButton.closest('.element');

    cardItem.remove();
});

function openPreview(name, link) {
    if (previewContainer.querySelector('.popup__figure') !== null) previewContainer.querySelector('.popup__figure').remove();
    const previewTemplate = document.querySelector('#preview-image').content;
    const previewElement = previewTemplate.cloneNode(true);

    previewElement.querySelector('.popup__image').src = link;
    previewElement.querySelector('.popup__capture').textContent = name;

    previewContainer.append(previewElement);

    popupPreview.classList.toggle('popup_opened');
}