"use strict";

const express = require('express');
const router = express.Router();
const stripe = require('../controllers/stripe');


router.post('/create-checkout-session', stripe.createCheckoutSession);

module.exports = router;
