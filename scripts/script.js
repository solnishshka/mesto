const allPage = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.form');

console.log(allPage);

const popupTogle = function() {
    popup.classList.toggle('popup_opened');
    allPage.classList.toggle('page_js-overflow');
}

editButton.addEventListener('click', popupTogle);
closeButton.addEventListener('click', popupTogle);

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let nameInput = formElement.querySelector('.form__item_el_name');
    let jobInput = formElement.querySelector('.form__item_el_position');

    nameInput.value;
    jobInput.value;

    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle'); 

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    popupTogle();
}

formElement.addEventListener('submit', formSubmitHandler);

