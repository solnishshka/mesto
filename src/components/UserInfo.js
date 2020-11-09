export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo({ name, about, _id, avatar }) {
    this.name = name;
    this.job = about;
    this.id = _id;
    this.avatar = avatar;
  }

  setUserInfo() {
    this._nameElement.textContent = this.name;
    this._jobElement.textContent = this.job;
    this._avatarElement.src = this.avatar;
  }
}
