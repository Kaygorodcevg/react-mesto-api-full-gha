class Api {
  constructor(options) {
    this._options = options;
    this._url = this._options.url;
    this._headers = this._options.headers;
  }

  _serverAnswerHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._serverAnswerHandler);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._serverAnswerHandler);
  }

  changeUserInfo(data) {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._serverAnswerHandler);
  }

  getNewCard(data) {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._serverAnswerHandler);
  }

  changeAvatar({ avatar }) {
    return fetch(this._url + '/users/me/avatar', {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._serverAnswerHandler);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(this._url + `/cards/${id}/likes`, {
        credentials: 'include',
        method: 'PUT',
        headers: this._headers,
      }).then(this._serverAnswerHandler);
    } else {
      return fetch(this._url + `/cards/${id}/likes`, {
        credentials: 'include',
        method: 'DELETE',
        headers: this._headers,
      }).then(this._serverAnswerHandler);
    }
  }

  deleteCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    }).then(this._serverAnswerHandler);
  }
}

export default new Api({
  url: 'https://api.mesto.full-front.nomoredomains.monster',
  // url: 'lоcаlhost:3000',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
});

