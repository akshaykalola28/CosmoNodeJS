const express = require('express');
const router = express.Router();

let {postCropHandler, getCropHandler} = require('./handlers');
router.post('/add', postCropHandler);
router.get('/:username', getCropHandler);

module.exports = router;