const express = require('express');
const { authGuard, adminGuard } = require('../middleware/authMiddleware');
const {
  createPostCategory,
  getAllPostCategories,
  getSingleCategory,
  updatePostCategory,
  deletePostCategory,
  getTotalCategoriesCount,
} = require('../controllers/postCategoriesController');

const router = express.Router();

router.get('/count', getTotalCategoriesCount);

router
  .route('/')
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategories);

router
  .route('/:postCategoryId')
  .get(getSingleCategory)
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);

module.exports = router;
