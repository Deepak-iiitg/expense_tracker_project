const express = require('express');
const router = express.Router();
const resetController = require('../controllers/resetPassword');
router.post('/resetpassword',resetController.resetPassword);
module.exports  = {router};