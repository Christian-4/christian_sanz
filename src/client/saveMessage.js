const Message = require("../models/Message");

module.exports = (destination, message, sent, confirmation) => {
    return new Message({
        destination,
        message,
        sent,
        confirmation
    }).save()
}