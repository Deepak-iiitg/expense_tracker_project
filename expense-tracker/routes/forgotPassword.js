const exoress = require('express');
const router = exoress.Router();
const forgotControllers = require('../controllers/ForgotPassword');
router.post('/forget',forgotControllers.forgot);
module.exports = {router};