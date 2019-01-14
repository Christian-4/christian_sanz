const express = require('express');
const router = express.Router();
const validateMessages = require("../client/validateMessages.js")
const validateCredits = require("../client/validateCredits.js")
const testCredit = require("../client/testCredit.js")
const addCredit = require("../client/addCredit.js")
const getMessages = require("../client/getMessages.js")


router.get("/helloworld", (req, res, next) => {
    res.status(200).json("Hello, World");
});

router.post("/messages", (req, res, next) => {
    const { destination, message } = req.body

    if (validateMessages(req, res, destination, message)) {
        return
    }

    testCredit(res, destination, message)
});

router.post("/credit", (req, res, next) => {
    const { amount } = req.body

    if (validateCredits(req, res, amount)) {
        return
    }

    addCredit(res, amount)
});

router.get("/messages", (req, res, next) => {
    getMessages(res)
});

module.exports = router;