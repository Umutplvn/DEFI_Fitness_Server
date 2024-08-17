"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe');
const bodyParser = require('body-parser');

router.post('/create-checkout-session', stripeController.createCheckoutSession);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripeController.webhook);

module.exports = router;
