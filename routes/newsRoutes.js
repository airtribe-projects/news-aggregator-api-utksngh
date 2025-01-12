const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, newsController.getNews);
router.get('/read', authMiddleware, newsController.getAllReadNews);
router.get('/favorite', authMiddleware, newsController.getAllFavoriteNews);
router.patch('/:id/read', authMiddleware, newsController.MarkAsRead);
router.patch('/:id/favorite', authMiddleware, newsController.MarkAsFavorite);    
router.get('/search/:keyword', authMiddleware, newsController.searchNews);

module.exports = router;
