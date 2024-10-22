const express = require('express');
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPost,
  getTotalPostsCount,
} = require('../controllers/postControllers');
const { authGuard, adminGuard } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/count', getTotalPostsCount);
router.route('/').post(authGuard, adminGuard, createPost).get(getAllPosts);
router
  .route('/:slug')
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

module.exports = router;
