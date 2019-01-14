
module.exports = function (req, res, amount) {
    if (!Object.keys(req.body).includes("amount")) {
        res.status(400).json("'amount' parameter is required")
        return true
    }

    if (amount > 500) {
        res.status(400).json("The max amount to add is 500 credits each time")
        return true
    }

    if (amount <= 0) {
        res.status(400).json("The min amount to add is 1 credit each time")
        return true
    }

    if (amount === "") {
        res.status(400).json("'amount' parameter cant be empty")
        return true
    }

    if (typeof amount !== "number" || amount % 1 !== 0) {
        res.status(400).json("'amount' parameter must be an integer number")
        return true
    }
}