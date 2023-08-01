const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
router.post('/payment',paymentController.payment);
router.post('/payment/verify/:email',paymentController.paymentCapture);
module.exports = {router};