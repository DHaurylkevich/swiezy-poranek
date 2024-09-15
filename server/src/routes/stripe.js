const express = require("express");
const router = express.Router();
const stripe = require("stripe")('sk_test_51PyZBU069nJjIh9tFZ0lXTzRU1AvNZNK5wXiPe6KLuXIGzj3BYNshG9TQKjhKAPvs7gNiZNJBwmGtlBOhNG8hDZf00KXoKlm6z');

const calculateOrderAmount = (items) => {
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    let total = 0;
    items.forEach((item) => {
        total += item.amount;
    });
    return total;
};

router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "pln",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (e) {
        res.status(500).send({ error: e.message });

    }

});

module.exports = router;