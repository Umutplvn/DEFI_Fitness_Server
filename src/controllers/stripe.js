"use strict";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

const cancelSubscription = async (req, res) => {
    const { subscriptionId } = req.params;
    const { userId } = req.body; 
    try {
      const deletedSubscription = await stripe.subscriptions.del(subscriptionId);
  
      const result = await User.findByIdAndUpdate(
        userId,
        { membership: 'Basic' },
        { new: true, runValidators: true }
      );
  
      if (result) {
        console.log(`User with ID: ${userId} updated to Free`);
      } else {
        console.error(`User with ID: ${userId} was not updated.`);
      }
  
      res.status(200).json(deletedSubscription);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
module.exports = {
  createCheckoutSession,
  cancelSubscription
};
