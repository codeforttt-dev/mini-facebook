const express = require('express');
const router = express.Router();
const signupController = require('../controllers/auth/singup');
const loginController = require('../controllers/auth/login');

router.post('/signup', signupController.signup);
router.post('/login', loginController.login);

module.exports = router;
