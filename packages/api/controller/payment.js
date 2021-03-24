import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Stripe from 'stripe';
import user from '../models/user.js';

const stripe = Stripe("sk_test_51IVFaxLHdXfYBUdvUEenEUkBcbzyUvj5iWnEIBO95oXrJXoWIFIl8McBxD93ayXgMpCFHvrRysCLIuTaSMhuHm4m00WOLgJQu3");
const router = express.Router();
const customerId = "cus_J7WGH7d1Ay5fpi";

export const newUserPayment = async (req, res) => {
    console.log("\n\n Body Passed:", req.body);
    try {
        const customer = await stripe.customers.create(
            {
                email: req.body.email,
            }
            // {
            //   // If you are using your own api then you can add your organization account here. So it will link the customer with your organization
            //   stripeAccount: process.env.StripeAccountId,
            //}
        );
        return res.status(200).send({
            //   customerDetails: customer,
            customerId: customer.id,
            customerEmail: customer.email,
        });
    } catch (error) {
        return res.status(400).send({ Error: error.raw.message });
    }
}

export const createNewCard = async (req, res) => {
    User.findByIdAndUpdate(req.params.id,
        {
            $push: {
                paymentCard: {
                    cardName: req.params.cardName,
                    cardNumber: req.params.cardNumber,
                    cardExpMonth: req.params.cardExpMonth,
                    cardExpYear: req.params.cardExpYear,
                    cardCVC: req.params.cardCVC,
                    country: req.params.country,
                    postalCode: req.params.postalCode
                }
            }
        },
        { new: false }, (err, doc) => {
            if (!err) {

            } else {
                console.log('Error create Card' + JSON.stringify(err, undefined, 2));
            }
        }
    )
}

export const getAllCard = async (req, res) => {
    const cards = [];
    try {
        const savedCards = await stripe.customers.listSources(customerId, {
            object: "card",
        });
        const cardDetails = Object.values(savedCards.data);

        cardDetails.forEach((cardData) => {
            let obj = {
                cardId: cardData.id,
                cardType: cardData.brand,
                cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
                cardLast4: cardData.last4,
            };
            cards.push(obj);
        });
        return res.status(200).send({
            cardDetails: cards,
        });
    } catch (error) {
        return res.status(400).send({

        });
    }
}

export const updateCardDetails = async (req, res) => {
    const { cardName, cardExpMonth, cardExpYear, cardId } = req.body;

    if (!cardId) {
        return res.status(400).send({
            Error: "CardID is Required to update",
        });
    }
    try {
        const card = await stripe.customers.updateSource(customerId, cardId, {
            name: cardName,
            exp_month: cardExpMonth,
            exp_year: cardExpYear,
        });
        return res.status(200).send({
            updatedCard: card,
        });
    } catch (error) {
        return res.status(400).send({
            Error: error.raw.message,
        });
    }
}

export const deleteCard = async (req, res) => {
    const customerId = "cus_J7WGH7d1Ay5fpi";
    console.log("\n\n Body Passed:", req.body);

    const { cardId } = req.body;
    if (!cardId) {
        return res.status(400).send({
            Error: "CardId is required to delete Card",
        });
    }
    try {
        const deleteCard = await stripe.customers.deleteSource(customerId, cardId);
        return res.status(200).send(deleteCard);
    } catch (error) {
        return res.status(400).send({
            Error: error,
        });
    }
}

export const createCharges = async (req, res, next) => {
    const customerId = "cus_J7pS4qPTsngNej";
    const { amount, cardId, oneTime, email } = req.body;
    if (oneTime) {
        const {
            cardNumber,
            cardExpMonth,
            cardExpYear,
            cardCVC,
            country,
            postalCode,
        } = req.body;

        if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
            return res.status(400).send({
                Error: "Necessary Card Details are required for One Time Payment",
            });
        }
        try {
            const cardToken = await stripe.tokens.create({
                card: {
                    number: cardNumber,
                    exp_month: cardExpMonth,
                    exp_year: cardExpYear,
                    cvc: cardCVC,
                    address_state: country,
                    address_zip: postalCode,
                },
            });

            const charge = await stripe.charges.create({
                amount: amount,
                currency: "usd",
                source: cardToken.id,
                receipt_email: email,
                description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
            });

            if (charge.status === "succeeded") {
                return res.status(200).send({ Success: charge });
            } else {
                return res
                    .status(400)
                    .send({ Error: "Please try again later for One Time Payment" });
            }
        } catch (error) {
            return res.status(400).send({
                Error: error,
            });
        }
    } else {
        try {
            const createCharge = await stripe.charges.create({
                amount: amount,
                currency: "usd",
                receipt_email: email,
                customer: customerId,
                card: cardId,
                description: `Stripe Charge Of Amount ${amount} for Payment`,
            });
            if (createCharge.status === "succeeded") {
                return res.status(200).send({ Success: charge });
            } else {
                return res
                    .status(400)
                    .send({ Error: "Please try again later for payment" });
            }
        } catch (error) {
            return res.status(400).send({
                Error: error,
            });
        }
    }
}

export const createPayemnt = async (req, res) => {
    const customerId = "cus_J7pS4qPTsngNej";
    const { amount, cardId, email } = req.body;
    try {
        const createCharge = await stripe.charges.create({
            amount: amount,
            currency: "usd",
            receipt_email: email,
            customer: customerId,
            card: cardId,
            description: `Stripe Charge Of Amount ${amount} for Payment`,
        });
        if (createCharge.status === "succeeded") {
            return res.status(200).send({ Success: createCharge });
        } else {
            return res
                .status(400)
                .send({ Error: "Please try again later for payment" });
        }
    } catch (error) {
        return res.status(400).send({
            Error: error.raw.message,
        });
    }
}


export default router;