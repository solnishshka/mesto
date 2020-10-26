(()=>{"use strict";var e={inputSelector:".form__item",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_disabled",inputErrorClass:"form__item_type_error",errorClass:"form__item-error_visible"},t=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__add-button"),r=".popup_theme_edit-profile",o=".popup_theme_add-card",i=document.querySelector(r).querySelector(".form"),u=document.querySelector(o).querySelector(".form"),a=i.querySelector(".form__item_el_name"),c=i.querySelector(".form__item_el_position");function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._formSelector=n,this._handleCardClick=r}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._formSelector).content.querySelector(".element").cloneNode(!0)}},{key:"createNewCard",value:function(){this._element=this._getTemplate(),this._setEventListeners();var e=this._element.querySelector(".element__image");return this._element.querySelector(".element__title").textContent=this._name,e.src=this._link,e.alt="На карточке изображено: "+this._name,this._element}},{key:"_handleLikeIcon",value:function(){this._element.querySelector(".element__like-button").classList.toggle("element__like-button_liked")}},{key:"_deleteCard",value:function(){this._element.remove()}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".element__like-button").addEventListener("click",(function(){e._handleLikeIcon()})),this._element.querySelector(".element__delete-button").addEventListener("click",(function(){e._deleteCard()})),this._element.querySelector(".element__image").addEventListener("click",(function(){e._handleCardClick()}))}}])&&l(t.prototype,n),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=n,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_disableSaveButton",value:function(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)}},{key:"_toggleSubmitButtonState",value:function(e){this._hasInvalidInput(e)?this._disableSaveButton():(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_setEventListeners",value:function(){var e=this,t=Array.from(this._formElement.querySelectorAll(this._inputSelector));this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this._toggleSubmitButtonState(t),t.forEach((function(n){n.addEventListener("input",(function(){e._checkInputValidity(n),e._toggleSubmitButtonState(t)}))}))}},{key:"enableValidation",value:function(){var e=this;this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._disableSaveButton()})),this._setEventListeners()}}])&&f(t.prototype,n),e}();function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m=function(){function e(t,n){var r=t.data,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._data=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._data.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.append(e)}}])&&_(t.prototype,n),e}();function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var h=function(){function e(t){var n=t.nameSelector,r=t.jobSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._job=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this._profileData={name:this._name.textContent,job:this._job.textContent},this._profileData}},{key:"setUserInfo",value:function(e,t){this._name.textContent=e,this._job.textContent=t}}])&&y(t.prototype,n),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keyup",this._handleEscClose.bind(this))}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keyup",this._handleEscClose.bind(this))}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-button"))&&e.close()}))}}])&&d(t.prototype,n),e}();function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e,t,n){return(S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__image"),t._popupCapture=t._popup.querySelector(".popup__capture"),t}return t=u,(n=[{key:"open",value:function(e){var t=e.link,n=e.name;this._popupImage.src=t,this._popupImage.alt="Фотография местности: "+n,this._popupCapture.textContent=n,S(w(u.prototype),"open",this).call(this)}}])&&k(t.prototype,n),u}(v);function L(e){return(L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(e,t,n){return(O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function q(e,t){return(q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e,t){return!t||"object"!==L(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var x=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&q(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._submitForm=t,n._formElement=n._popup.querySelector(".form"),n._inputList=n._formElement.querySelectorAll(".form__item"),n}return t=u,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t,n){e[n]=t.value})),e}},{key:"_clearErrorValidation",value:function(){this._formElement.querySelectorAll(".form__item_type_error")&&this._formElement.querySelectorAll(".form__item_type_error").forEach((function(e){e.classList.remove("form__item_type_error"),document.querySelector("#".concat(e.id,"-error")).textContent="",document.querySelector("#".concat(e.id,"-error")).classList.remove("form__item-error_visible")}))}},{key:"close",value:function(){O(P(u.prototype),"close",this).call(this),this._formElement.reset(),this._clearErrorValidation()}},{key:"setEventListeners",value:function(){var e=this;O(P(u.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._submitForm()}))}}])&&j(t.prototype,n),u}(v),R=new C(".popup_theme_preview-image"),B=new h({nameSelector:".profile__title",jobSelector:".profile__subtitle"}),V=new m({data:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var t=new s(e,"#card",(function(){R.open(e)})).createNewCard();V.addItem(t)}},".elements"),T=new x(o,(function(){var e={name:T._getInputValues()[0],link:T._getInputValues()[1]},t=new s(e,"#card",(function(){R.open(e)}));V.addItem(t.createNewCard()),T.close()})),D=new x(r,(function(){B.setUserInfo(D._getInputValues()[0],D._getInputValues()[1]),D.close()}));V.renderItems(),T.setEventListeners(),R.setEventListeners(),D.setEventListeners(),t.addEventListener("click",(function(){a.value=B.getUserInfo().name,c.value=B.getUserInfo().job,D.open()})),n.addEventListener("click",(function(){T.open()})),new p(e,i).enableValidation(),new p(e,u).enableValidation()})();