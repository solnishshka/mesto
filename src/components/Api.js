export default class Api {
  constructor({ url, headers }) {
    this._headers = headers;
    this._url = url;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  setUserInfo({ userName, userJob }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  setUserAvatar({ avatarLink }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  addNewCard({ link, name }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }
}
