const express = require('express');
const { createUser, loginUsername, loginEmail, getAllUsers, getUserById } = require('../controllers/userController');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');

router.post('/register', createUser);
router.post('/loginUsername', loginUsername);
router.post('/loginEmail', loginEmail);
router.get('/' , getAllUsers);
router.get('/me', authenticateUser, getUserById);

module.exports = router;