const express = require('express');
const router = express.Router();
const validateMessages = require("../client/validateMessages.js")
const sendMessage = require("../client/client.js")
const saveMessage = require("../client/saveMessage.js")
const getMessages = require("../client/getMessages.js")


router.get("/helloworld", (req, res, next) => {
    res.status(200).json("Hello, World");
});

router.post("/messages", (req, res, next) => {
    const { destination, message } = req.body

    if (validateMessages(req, res, destination, message)) {
        return
    }

    sendMessage(destination, message)
        .then(response => {
            if (response.status === 200) {
                saveMessage(destination, message, true, true)
                    .then(() => res.status(200).json(response.data + ", message sent"))
                    .catch(err => res.status(500).json("Internal Server Error"))
                return
            }
        })
        .catch(err => {
            if (err.response === undefined) {
                saveMessage(destination, message, true, false)
                    .then(() => res.status(504).json("Error to send the message, Timeout"))
                    .catch(err => res.status(500).json("Internal Server Error"))
                return
            }
            saveMessage(destination, message, false, true)
                .then(() => res.status(500).json(err.response.data + ", Error to send the message"))
                .catch(err => res.status(500).json("Internal Server Error"))
        })
});

router.get("/messages", (req, res, next) => {
    getMessages()
        .then(messages => {
            if (messages.length === 0) {
                res.status(200).json("There aren't messages")
            }
            res.status(200).json(messages)
        })
        .catch(err => res.status(500).json("Internal Server Error"))
});

module.exports = router;