const express = require('express');
const router = express.Router();
const sendMessage = require("../client.js")
const persistence = require("../persistence.js")


router.get("/helloworld", (req, res, next) => {
    res.status(200).json("Hello, World");
});

router.post("/messages", (req, res, next) => {
    const { destination, message } = req.body

    if (!Object.keys(req.body).includes("destination") || !Object.keys(req.body).includes("message")) {
        res.status(400).json("'destination' and 'message' parameters are requireds")
        return
    }

    if (destination.length > 50 || message.length > 128) {
        res.status(413).json("'destination' respect 50 characters and 'message' respect 128")
        return
    }

    if (destination === "" || message === "") {
        res.status(400).json("'destination' and 'message' parameters cant be empty")
        return
    }

    if (typeof destination !== "string" || typeof message !== "string") {
        res.status(400).json("'destination' and 'message' parameters must be strings")
        return
    }

    sendMessage(destination, message)
        .then(response => {
            if (response.status === 200) {
                persistence.saveMessage(destination, message, true, true)
                    .then(() => res.status(200).json(response.data + ", message sent"))
                    .catch(err => res.status(500).json("Internal Server Error"))
                return
            }
        })
        .catch(err => {
            if (err.response === undefined) {
                persistence.saveMessage(destination, message, true, false)
                    .then(() => res.status(504).json("Error to send the message, Timeout"))
                    .catch(err => res.status(500).json("Internal Server Error"))
                return
            }
            persistence.saveMessage(destination, message, false, true)
                .then(() => res.status(500).json(err.response.data + ", Error to send the message"))
                .catch(err => res.status(500).json("Internal Server Error"))
        })
});

router.get("/messages", (req, res, next) => {
    persistence.getMessages()
        .then(messages => {
            if (messages.length === 0) {
                res.status(200).json("There aren't messages")
            }
            res.status(200).json(messages)
        })
        .catch(err => res.status(500).json("Internal Server Error"))
});

module.exports = router;