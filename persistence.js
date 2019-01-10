const Message = require("./models/Message");

const persistence = {
    saveMessage: function (destination, message, sent) {
        return new Message({
            destination,
            message,
            sent
        }).save()
    },

    getMessages: function () {
        return Message.find({}, { _id: 0, destination: 1, message: 1, sent: 1 })
    }
}

module.exports = persistence