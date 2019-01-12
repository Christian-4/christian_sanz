const Message = require("../models/Message")

module.exports = (conditions = {}) => {
    return Message.find(conditions, { _id: 0, destination: 1, message: 1, sent: 1, confirmation: 1 })
}