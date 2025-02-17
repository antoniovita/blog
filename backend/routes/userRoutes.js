const express = require('express');
const { createUser, loginUsername, loginEmail, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/loginUsername', loginUsername);
router.post('/loginEmail', loginEmail);
router.get('/' , getAllUsers);

module.exports = router;