"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User=require('./src/models/user')
const  sendInvoiceEmail  = require('./src/helpers/sendInvoice'); 
const sendCancellationEmail=require('./src/helpers/cancellationNotification');

/*--------------------------------------*/

//! Middleware for JSON parsing and CORS
app.use(require('cors')());

/*--------------------------------------*/

//! Webhook route
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const customerId = session.customer;
            const user = await User.findOne({ _id: userId });
            const email = user.email;

            const subscriptions = await stripe.subscriptions.list({
                customer: customerId,
                status: 'all',
                expand: ['data.default_payment_method'],
            });

            const subscription = subscriptions.data[0];
            const subscriptionId = subscription.id;

            try {
                const result = await User.updateOne(
                    { _id: userId },
                    { membership: 'Premium', stripeCustomerId: subscriptionId },
                    { new: true, runValidators: true }
                );

                if (result) {
                    console.log(`User with ID: ${userId} updated to Premium`);
                } else {
                    console.error(`User with ID: ${userId} was not updated.`);
                }

                const invoices = await stripe.invoices.list({
                    customer: customerId,
                    limit: 1
                  });
                if (invoices.data.length > 0) {
                    const invoiceId = invoices.data[0].id;
                    await sendInvoiceEmail(email, invoiceId);
                  }

            } catch (error) {
                console.error('Error updating user membership:', error);
            }
        }

        if (event.type === 'customer.subscription.deleted') {
            const subscription = event.data.object;
            const customerId = subscription.customer;

            try {
                const user = await User.findOne({ stripeCustomerId: customerId });

                if (user) {
                    const userId = user._id;
                    await User.updateOne(
                        { stripeCustomerId: customerId },
                        { membership: 'Basic' },
                        { new: true, runValidators: true }
                    );

                    console.log(`User with ID: ${userId} updated to Basic`);
                    const email = user.email;
                    await sendCancellationEmail(email);

                } else {
                    console.error(`User with customer ID: ${customerId} was not found.`);
                }
            } catch (error) {
                console.error('Error updating user membership:', error);
            }
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

/*--------------------------------------*/
app.use(express.json());
/*--------------------------------------*/

//! Connect to MongoDB with Mongoose:
require('./src/configs/dbConnection');

//! Authorization Middleware
app.use(require("./src/middlewares/authorization"));

/*--------------------------------------*/
//! Searching&Sorting&Pagination:
app.use(require('./src/middlewares/findSearchSortPage'));

/*--------------------------------------*/

//! Home Page
app.all('/', (req, res) => {
    res.send({
        err: false,
        message: 'Welcome to DEFI APP',
    });
});

/*--------------------------------------*/
//! Routes:
app.use("/users", require("./src/routes/user"));
app.use("/auth", require("./src/routes/auth"));
app.use("/blog", require("./src/routes/blog"));
app.use("/comment", require("./src/routes/comment"));
app.use("/bmi", require("./src/routes/bmi"));
app.use("/pr", require("./src/routes/pr"));
app.use("/size", require("./src/routes/size"));
app.use("/api", require("./src/routes/stripe")); 

/*--------------------------------------*/
//! errorHandler:
app.use(require('./src/errorHandler'));

/*--------------------------------------*/
app.listen(PORT, () => console.log(`App is running: ${HOST}:${PORT}`));
