const router = require('express').Router();
const {
  getUsers,
  getUsersById,
  signOut,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { updateUserInfo, userId, updateUserAvatar } = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.delete('/me', signOut);

router.get('/:userId', userId, getUsersById);

router.patch('/me', updateUserInfo, updateUser);

router.patch('/me/avatar', updateUserAvatar, updateAvatar);

module.exports = router;
