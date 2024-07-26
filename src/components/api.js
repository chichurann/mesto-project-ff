// // api.js

// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
//   headers: {
//     authorization: 'e4344387-77c3-4647-9071-058895f3a3fe',
//     'Content-Type': 'application/json'
//   }
// };

// // Проверка статуса ответа
// const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status}`);
// };

// // Получение информации о текущем пользователе
// export const getMe = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers
//   })
//     .then(checkResponse);
// };

// // Обновление профиля пользователя
// export const updateProfile = (name, about) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({ name, about })
//   })
//     .then(checkResponse);
// };

// // Обновление аватара пользователя
// export const updateUserPhoto = (avatar) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({ avatar })
//   })
//     .then(checkResponse);
// };

// // Получение всех карточек
// export const getCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(checkResponse);
// };

// // Добавление новой карточки
// export const addCard = (card) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: 'POST',
//     headers: config.headers,
//     body: JSON.stringify(card)
//   })
//     .then(checkResponse);
// };

// // Удаление карточки
// export const deleteCard = (id) => {
//   return fetch(`${config.baseUrl}/cards/${id}`, {
//     method: 'DELETE',
//     headers: config.headers
//   })
//     .then(checkResponse);
// };

// // Переключение лайка карточки
// export const switchLikeCard = (id, isLiked) => {
//   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
//     method: isLiked ? 'DELETE' : 'PUT',
//     headers: config.headers
//   })
//     .then(checkResponse);
// };


