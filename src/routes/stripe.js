"use strict";

const express = require('express');
const router = express.Router();
const stripe = require('../controllers/stripe');


router.post('/create-checkout-session', stripe.createCheckoutSession);
router.delete('/cancel/:subscriptionId', stripe.cancelSubscription);

module.exports = router;
