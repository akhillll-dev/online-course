const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    verifyPayment, 
    downloadReceipt, 
    sendEmailRoute,
    getOrder
} = require('../controllers/paymentController');

// POST /api/create-order
router.post('/create-order', createOrder);

// POST /api/verify-payment
router.post('/verify-payment', verifyPayment);

// GET /api/download-receipt/:orderId
router.get('/download-receipt/:orderId', downloadReceipt);

// POST /api/send-email
router.post('/send-email', sendEmailRoute);

// GET /api/order/:orderId
router.get('/order/:orderId', getOrder);

module.exports = router;
