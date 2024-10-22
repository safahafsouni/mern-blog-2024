const express = require('express');
const {
  loginUser,
  registerUser,
  updateProfile,
  updateProfilePicture,
  userProfile,
  getAllUsers,
  deleteUser,
  getTotalUsersCount,
} = require('../controllers/userControllers');
const { authGuard, adminGuard } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authGuard, userProfile);
router.put('/updateProfile/:userId', authGuard, updateProfile);
router.put('/updateProfilePicture', authGuard, updateProfilePicture);
router.get('/', authGuard, adminGuard, getAllUsers);
router.delete('/:userId', authGuard, adminGuard, deleteUser);
router.get('/count', authGuard, getTotalUsersCount);

module.exports = router;
