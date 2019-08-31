const express = require('express');
const router = express.Router();

let {postLandHandler, getLandHandler} = require('./handlers');
router.post('/add', postLandHandler);
router.get('/:username', getLandHandler);

module.exports = router;