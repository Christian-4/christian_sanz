const Credit = require("../models/Credit");
const sendMessage = require("./sendMessage.js")

module.exports = (res, destination, message, conditions = {}) => {
    Credit.find(conditions)
        .then(credits => {
            console.log(credits.length + " holaaaaa")
            if (credits.length === 0 || credits[0].amount < 1) {
                res.status(500).json("Insuficcient credit")
            } else {
                sendMessage(res, destination, message, credits[0])
            }
        })
}