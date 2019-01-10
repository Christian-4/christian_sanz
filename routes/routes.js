const express = require('express');
const router = express.Router();
const Message = require("../models/Message");
const sendMessage = require("../client.js")


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
                const newMessage = new Message({
                    destination,
                    message,
                    sent: true
                });
                newMessage.save()
                    .then(() => res.status(200).json(response.data + ", message sent"))
                    .catch(err => res.status(500).json("Internal Server Error"))
                return
            }

            if (response.status === 500) {
                const newMessage = new Message({
                    destination,
                    message
                });
                newMessage.save()
                    .then(() => res.status(500).json(response.data + ", Error to send the message"))
                    .catch(err => res.status(500).json("Internal Server Error"))
                return
            }
        })
        .catch(err => res.status(500).json("Internal Server Error"))
});

module.exports = router;