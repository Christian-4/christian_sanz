
module.exports = function (req, res, destination, message) {
    if (!Object.keys(req.body).includes("destination") || !Object.keys(req.body).includes("message")) {
        res.status(400).json("'destination' and 'message' parameters are requireds")
        return true
    }

    if (destination.length > 50 || message.length > 128) {
        res.status(413).json("'destination' respect 50 characters and 'message' respect 128")
        return true
    }

    if (destination === "" || message === "") {
        res.status(400).json("'destination' and 'message' parameters cant be empty")
        return true
    }

    if (typeof destination !== "string" || typeof message !== "string") {
        res.status(400).json("'destination' and 'message' parameters must be strings")
        return true
    }
}