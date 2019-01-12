const express = require('express');
const router = express.Router();
const validateMessages = require("../client/validateMessages.js")
const sendMessage = require("../client/sendMessage.js")
const getMessages = require("../client/getMessages.js")


router.get("/helloworld", (req, res, next) => {
    res.status(200).json("Hello, World");
});

router.post("/messages", (req, res, next) => {
    const { destination, message } = req.body

    if (validateMessages(req, res, destination, message)) {
        return
    }

    sendMessage(res, destination, message)
});

router.get("/messages", (req, res, next) => {
    getMessages(res)
});

module.exports = router;