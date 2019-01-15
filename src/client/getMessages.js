const {Message, Message2} = require("../models/Message")

module.exports = (res, conditions = {}) => {
    Message.find(conditions, { _id: 0, destination: 1, message: 1, sent: 1, confirmation: 1 })
        .then(messages => {
            if (messages.length === 0) {
                res.status(200).json("There aren't messages")
            }
            res.status(200).json(messages)
        })
        .catch(err => res.status(500).json("Internal Server Error"))
}