const express = require('express');
const router = express.Router();

const userController = require('../controller/users.controller');

//Auth Sign Up 
router.post('/register', userController.register);

module.exports = router;