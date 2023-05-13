const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../utils/ConflictError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const findUserById = (req, res, userData, next) => {
  User.findById(userData)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsersById = (req, res, next) => {
  const userData = req.params.userId;
  findUserById(req, res, userData, next);
};

module.exports.getUserInfo = (req, res, next) => {
  const userData = req.user._id;
  findUserById(req, res, userData, next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => User.findOne(user)
      .then((userData) => res.send(userData)))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError());
      }
      return next();
    });
};

const updateUserInfo = (req, res, newData, next) => {
  User.findByIdAndUpdate(req.user._id, newData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  updateUserInfo(req, res, { name, about }, next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserInfo(req, res, { avatar }, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};
