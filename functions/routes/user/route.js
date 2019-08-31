const express = require('express');
const router = express.Router();

let {postRegisterHandler, postLoginHandler} = require('./handlers');
router.post('/register', postRegisterHandler);
router.post('/login', postLoginHandler);

module.exports = router;