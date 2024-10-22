const express = require('express');
const { authGuard, adminGuard } = require('../middleware/authMiddleware');
const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
  getTotalCommentsCount,
} = require('../controllers/commentControllers');

const router = express.Router();

router
  .route('/')
  .post(authGuard, createComment)
  .get(authGuard, adminGuard, getAllComments);
router
  .route('/:commentId')
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);
router.get('/count', authGuard, getTotalCommentsCount);

module.exports = router;
