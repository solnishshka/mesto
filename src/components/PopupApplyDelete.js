import Popup from "./Popup";

export default class PopupApplyDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popup.querySelector(".form");
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit();
          });
    }

    setSubmitCallback(handleSubmit) {
        this._handleSubmit = handleSubmit;
    }
}