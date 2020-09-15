const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const cardContainer = document.querySelector('.elements');
let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_position');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

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

function addCard(name, link) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__image').src = link;

    cardContainer.append(cardElement);
}

initialCards.forEach(item => addCard(item.name, item.link));

const popupToggle = function() {
    if (!popup.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
    }
    
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

