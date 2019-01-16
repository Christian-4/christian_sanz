require('dotenv').config();

const axios = require('axios')
const locks = require('locks');
const mutex = locks.createMutex();
const saveMessage = require("./saveMessage.js")
const { Credit, Credit2 } = require("../models/Credit");

module.exports = (res, destination, body, credit) => {
    mutex.lock(function () {
        Credit.findByIdAndUpdate(credit._id, { $inc: { amount: -1 } }, { new: true })
            .then(() => {
                Credit2.find({})
                    .then(credits2 => {
                        credits2[0].update({ $inc: { amount: -1 } }, { new: true })
                            .then(() => {
                                axios({ method: "post", url: `${process.env.URLBASE}/message`, timeout: 3000, data: { destination, body } })
                                    .then(response => {
                                        if (response.status === 200) {
                                            saveMessage(destination, body, true, true, "primary")
                                                .then(() => {
                                                    saveMessage(destination, body, true, true, "replica")
                                                    res.status(200).json(response.data + ", message sent")
                                                    mutex.unlock();
                                                })
                                                .catch(err => {
                                                    res.status(500).json("Internal Server Error " + err)
                                                    mutex.unlock();
                                                })
                                            return
                                        }
                                    })
                                    .catch(err => {
                                        if (err.response === undefined) {
                                            Credit.findByIdAndUpdate(credit._id, { $inc: { amount: 1 } }, { new: true })
                                                .then(() => {
                                                    credits2[0].update({ $inc: { amount: 1 } }, { new: true })
                                                        .then(() => {
                                                            saveMessage(destination, body, true, false, "primary")
                                                                .then(() => {
                                                                    saveMessage(destination, body, true, false, "replica")
                                                                    res.status(504).json("Error to send the message, Timeout")
                                                                    mutex.unlock();
                                                                })
                                                                .catch(err => {
                                                                    res.status(500).json("Internal Server Error " + err)
                                                                    mutex.unlock();
                                                                })
                                                        })
                                                        .catch(err => {
                                                            res.status(500).json("Internal Server Error " + err)
                                                            mutex.unlock();
                                                        })
                                                })
                                                .catch(err => {
                                                    res.status(500).json("Internal Server Error " + err)
                                                    mutex.unlock();
                                                })
                                            return
                                        }
                                        saveMessage(destination, body, false, true, "primary")
                                            .then(() => {
                                                saveMessage(destination, body, false, true, "replica")
                                                Credit.findByIdAndUpdate(credit._id, { $inc: { amount: 1 } }, { new: true })
                                                    .then(() => {
                                                        credits2[0].update({ $inc: { amount: 1 } }, { new: true })
                                                            .then(() => {
                                                                res.status(500).json(err.response.data + ", Error to send the message")
                                                                mutex.unlock();
                                                            })
                                                            .catch(err => {
                                                                res.status(500).json("Internal Server Error " + err)
                                                                mutex.unlock();
                                                            })
                                                    })
                                                    .catch(err => {
                                                        res.status(500).json("Internal Server Error " + err)
                                                        mutex.unlock();
                                                    })
                                            })
                                            .catch(err => {
                                                res.status(500).json("Internal Server Error " + err)
                                                mutex.unlock();
                                            })
                                    })
                            })
                            .catch(err => {
                                Credit.findByIdAndUpdate(credit._id, { $inc: { amount: 1 } }, { new: true })
                                    .then(() => {
                                        res.status(500).json("Internal Server Error " + err)
                                        mutex.unlock();
                                    })
                            })
                    })
                    .catch(err => {
                        Credit.findByIdAndUpdate(credit._id, { $inc: { amount: 1 } }, { new: true })
                            .then(() => {
                                res.status(500).json("Internal Server Error " + err)
                                mutex.unlock();
                            })
                    })
            })
            .catch(err => {
                Credit.findByIdAndUpdate(credit._id, { $inc: { amount: 1 } }, { new: true })
                    .then(() => {
                        res.status(500).json("Internal Server Error " + err)
                        mutex.unlock();
                    })
            })
    });
}