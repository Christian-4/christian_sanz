const axios = require('axios')
const locks = require('locks');
const mutex = locks.createMutex();
const saveMessage = require("./saveMessage.js")
const Credit = require("../models/Credit");


const urlBase = "http://christian_sanz_messageapp_1:3000"

module.exports = (res, destination, body, credit) => {
    mutex.lock(function () {
        Credit.findByIdAndUpdate(credit._id, { $inc: { amount: -1 } }, { new: true })
            .then(() => {
                axios({ method: "post", url: `${urlBase}/message`, timeout: 3000, data: { destination, body } })
                    .then(response => {
                        if (response.status === 200) {
                            saveMessage(destination, body, true, true)
                                .then(() => {
                                    res.status(200).json(response.data + ", message sent")
                                    mutex.unlock();
                                })
                                .catch(err => {
                                    res.status(500).json("Internal Server Error")
                                    mutex.unlock();
                                })
                            return
                        }
                    })
                    .catch(err => {
                        if (err.response === undefined) {
                            Credit.findByIdAndUpdate(credit._id, { $inc: { amount: 1 } }, { new: true })
                                .then(() => {
                                    saveMessage(destination, body, true, false)
                                        .then(() => {
                                            res.status(504).json("Error to send the message, Timeout")
                                            mutex.unlock();
                                        })
                                        .catch(err => {
                                            res.status(500).json("Internal Server Error")
                                            mutex.unlock();
                                        })
                                })
                                .catch(err => {
                                    res.status(500).json("Internal Server Error")
                                    mutex.unlock();
                                })
                            return
                        }
                        saveMessage(destination, body, false, true)
                            .then(() => {
                                Credit.findByIdAndUpdate(credit._id, { $inc: { amount: 1 } }, { new: true })
                                    .then(() => {
                                        res.status(500).json(err.response.data + ", Error to send the message")
                                        mutex.unlock();
                                    })
                                    .catch(err => {
                                        res.status(500).json("Internal Server Error")
                                        mutex.unlock();
                                    })
                            })
                            .catch(err => {
                                res.status(500).json("Internal Server Error")
                                mutex.unlock();
                            })
                    })
            })
            .catch(err => {
                Credit.findByIdAndUpdate(credit._id, { $inc: { amount: 1 } }, { new: true })
                res.status(500).json("Internal Server Error")
                mutex.unlock();
            })
    });
}