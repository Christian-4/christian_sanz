const express = require('express');
const router = express.Router();
const sendMessage = require("../client.js")


router.get("/holamundo", (req, res, next) => {
    res.status(200).json("Hola, mundo");
});

router.post("/messages", (req, res, next) => {
    const { destination, message } = req.body

    sendMessage(destination, message)
        .then(response => {
            if (response.status === 200) {
                res.status(200).json(response.data)
                return
            }

            if (response.status === 500) {
                res.status(500).json(response.data)
                return
            }
        })
        .catch(err => res.status(500).json("Error al enviar el mensaje"))
});

module.exports = router;