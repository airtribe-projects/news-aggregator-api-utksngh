const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/preferences',authMiddleware, userController.getPreferences);
router.put('/preferences',authMiddleware, userController.updatePreferences);

module.exports = router;
