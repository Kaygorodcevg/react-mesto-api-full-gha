[![Tests](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml/badge.svg)](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml)

# "Место": фронтенд и бэкенд на удаленном сервере
[**Mesto**](https://mesto.full-front.nomoredomains.monster) (открыть проект в браузере)

## Описание проекта
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.  
В этом сервисе можно делиться фотографими: добавлять фото, удалять их и ставить лайки.

## Основной функционал
* регистрация и авторизация,
* создание и удаление и карточки,
* просмотр всех загруженных карточек,
* постановка и снятие лайка,
* обновление персональных данных пользователя и аватара,
* открытие фотографии из карточки в полноэкранном режиме.

## Инструменты и технологии
- Frontend:
    - HTML5
    - CCS3
    - JavaScript (ES6)
    - React (Create React App, разметка в JSX, функциональные компоненты и хуки),
    - сайт адаптирован под разные расширения экранов,
    - flexbox,
    - grid,
    - БЭМ (наименование классов и организация файловой структуры стилей),
    - Webpack.
- Backend:
   - Node.js,
   - mongoDB,
   - express.js,
   - mongoose,
   - celebrate,
   - winston - логирование запросов и ошибок.
- Удаленный сервер:
    - облачный сервер на Яндекс.Облако,
    - домены по которым можно обратиться к API,
    - SSL сертификат.
----------------
### Запуск:

* Frontend <https://mesto.full-front.nomoredomains.monster>
* Backend <https://api.mesto.full-front.nomoredomains.monster>