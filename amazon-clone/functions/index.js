const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const { default: App } = require("../src/App");
const stripe = require("stripe")('sk_test_51MsMs2SGQXBIbWm2nYWKovDcPl5zmNdXjZm22Kb0RByqbz4R7UnKpQTXlncyK301YjD9l7UcFND7QoUt0JAuVIfB00q2cKIiu7')

//API
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes

app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment request received BOOM!! for this amount>>', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,//Sub units of the currency
        currency: "INR",
        metadata: { integration_check: "accept_a_payment" },

    });

    // 201-for ok and it created something 
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,

    })
})
// - Listen command
exports.api = functions.https.onRequest(app)
