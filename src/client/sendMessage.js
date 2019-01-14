const axios = require('axios')
const saveMessage = require("./saveMessage.js")

const urlBase = "http://christian_sanz_messageapp_1:3000"

module.exports = (res, destination, body) => {
    axios({ method: "post", url: `${urlBase}/message`, timeout: 3000, data: { destination, body } })
        .then(response => {
            if (response.status === 200) {
                saveMessage(destination, body, true, true)
                    .then(() => res.status(200).json(response.data + ", message sent"))
                    .catch(err => res.status(500).json("Internal Server Error"))
                return
            }
        })
        .catch(err => {
            if (err.response === undefined) {
                saveMessage(destination, body, true, false)
                    .then(() => res.status(504).json("Error to send the message, Timeout"))
                    .catch(err => res.status(500).json("Internal Server Error"))
                return
            }
            saveMessage(destination, body, false, true)
                .then(() => res.status(500).json(err.response.data + ", Error to send the message"))
                .catch(err => res.status(500).json("Internal Server Error"))
        })
}