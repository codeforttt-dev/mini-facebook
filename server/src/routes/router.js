const express = require('express');
const router = express.Router();
const signupController = require('../controllers/auth/singup');
const loginController = require('../controllers/auth/login');
const profileController = require('../controllers/auth/profile');
const authMiddleware = require('../middleware/auth');

router.post('/signup', signupController.signup);
router.post('/login', loginController.login);
router.put('/profile-picture', authMiddleware, profileController.updateProfilePicture);

module.exports = router;
