const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

const popupTogle = function() {
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', popupTogle);
closeButton.addEventListener('click', popupTogle);

