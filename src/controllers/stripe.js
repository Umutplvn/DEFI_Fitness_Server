"use strict";
/* -------------------------------------------------------
    STRIPE - DEFI Project
------------------------------------------------------- */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const User = require('../models/user');

const createCheckoutSession = async (req, res) => {
  const { priceId, userId, email } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `http://localhost:3000/profile`,
      cancel_url: `http://localhost:3000/profile`,
      customer_email: email,  
      metadata: { userId: userId }
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
    const objectId = mongoose.Types.ObjectId(userId);

    const result = await User.findOneAndUpdate(
      { _id: objectId },
      { membership: 'Premium' },
      { new: true, runValidators: true }
    );
    res.send({result})
if (result.modifiedCount > 0) {
      console.log(`User with ID: ${userId} updated to Premium`);
    } else {
      console.error(`User with ID: ${userId} was not updated.`);
    }
  } catch (error) {
    console.error('Error updating user membership:', error);
  }
};


const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    // Ham veriyi req.rawBody kullanarak doğrulayın
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    console.log('Webhook received:', event);

    if (event.type === 'checkout.session.completed') {
      await handleCheckoutSessionCompleted(event);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = {
  createCheckoutSession,
  webhook,
};
