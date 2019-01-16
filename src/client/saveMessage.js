const { Message, Message2 } = require("../models/Message");

module.exports = (destination, message, sent, confirmation, db) => {
    if (db === "primary") {
        return new Message({
            destination,
            message,
            sent,
            confirmation
        }).save()
    }

    if (db === "replica") {
        return new Message2({
            destination,
            message,
            sent,
            confirmation
        }).save()
    }

}