const locks = require('locks');
const mutex = locks.createMutex();
const { Credit, Credit2 } = require("../models/Credit");

module.exports = (res, amount, conditions = {}) => {
    Credit.find(conditions)
        .then(credits => {
            if (credits.length === 0) {
                new Credit({
                    amount
                }).save()
                    .then(creditCreated => {
                        new Credit2({
                            amount
                        }).save()
                            .then(() => res.status(200).json(`There are ${creditCreated.amount} credits`))
                            .catch(err => {
                                creditCreated.remove()
                                res.status(500).json("Error to add credit")
                            })
                    })
                    .catch(err => res.status(500).json("Error to add credit"))
            } else {
                mutex.lock(function () {
                    credits[0].update({ $inc: { amount } }, { new: true })
                        .then(() => {
                            Credit2.find(conditions = {})
                                .then(credits2 => {
                                    credits2[0].update({ $inc: { amount } }, { new: true })
                                        .then(() => {
                                            res.status(200).json(`There are ${credits[0].amount + amount} credits`)
                                            mutex.unlock();
                                        })
                                        .catch(err => {
                                            credits[0].update({ $inc: { amount: -amount } }, { new: true })
                                                .then(() => {
                                                    res.status(500).json("Error to add credit")
                                                    mutex.unlock();
                                                })
                                        })
                                })
                                .catch(err => {
                                    credits[0].update({ $inc: { amount: -amount } }, { new: true })
                                        .then(() => {
                                            res.status(500).json("Error to add credit")
                                            mutex.unlock();
                                        })
                                })
                        })
                        .catch(err => {
                            res.status(500).json("Error to add credit")
                            mutex.unlock();
                        })
                });
            }
        })
        .catch(err => res.status(500).json("Error to add credit"))
}