const express = require('express');
const { registerUser, signInUser } = require('../Controllers/authcontroller');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', signInUser);

module.exports = router;
