"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/user');

const createCheckoutSession = async (req, res) => {
  const { priceId } = req.body;
const userId=req.user.toString()
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
      metadata: { userId: userId },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleCheckoutSessionCompleted = async (event) => {
  const session = event.data.object;
  const userId = session.metadata.userId;

  try {
    await User.findByIdAndUpdate(userId, { membership: 'Premium' });
  } catch (error) {
    console.error('Error updating user membership:', error);
  }
};

const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    await handleCheckoutSessionCompleted(event);
  }

  res.json({ received: true });
};

module.exports = {
  createCheckoutSession,
  webhook,
};
