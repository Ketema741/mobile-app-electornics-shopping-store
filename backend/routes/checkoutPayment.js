require("dotenv").config()
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router()
const stripe = require("stripe")(process.env.SECRET_KEY)
const Product = require('../models/Product');

router.post("/checkout/session", async (req, res) => {
    return res.json({
        publishableKey: process.env.PUBLISHABLE_KEY,
    })
})
router.post("/create-checkout-session", async (req, res) => {

    try {
        //CHECKOUT SESSION
        const items = req.body.items

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items.map(item => {

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        })

        return res.json({
            url: session.url
        });

    } catch (error) {
        res.status(500).json({ error: error })
    }

});


module.exports = router; 