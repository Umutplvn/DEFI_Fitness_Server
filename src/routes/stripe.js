"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const express = require('express');
const router = express.Router();
const stripe = require('../controllers/stripe'); 
const bodyParser = require('body-parser');

router.post('/create-checkout-session', stripe.createCheckoutSession);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripe.webhook);

module.exports = router;
