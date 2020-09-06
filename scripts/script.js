const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_position');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

const popupToggle = function() {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
    }
    else {
        popup.classList.add('popup_opened');
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
    }    
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

