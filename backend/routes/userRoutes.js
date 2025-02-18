const express = require('express');
const { createUser, loginUsername, loginEmail, getAllUsers, getUserById, getUserByToken } = require('../controllers/userController');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');

router.post('/register', createUser);
router.post('/loginUsername', loginUsername);
router.post('/loginEmail', loginEmail);
router.get('/' , getAllUsers);
router.get('/:id', authenticateUser, getUserById);
router.get('/me', authenticateUser, getUserByToken);

module.exports = router;