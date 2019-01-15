require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const intervalID = setInterval(() => {
    mongoose
        .createConnection(process.env.DB, { useNewUrlParser: true })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.name}"`)
            clearInterval(intervalID)
        })
        .catch(err => {
            console.error('Error connecting to mongo', err)
        })
}, 1000)

const intervalID2 = setInterval(() => {
    mongoose
        .createConnection(process.env.DB, { useNewUrlParser: true })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.name}"`)
            clearInterval(intervalID2)
        })
        .catch(err => {
            console.error('Error connecting to mongo', err)
        })
}, 1000)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./src/routes/routes.js');
app.use('/', index);

app.listen(9001, () => {
    console.log(`Listening on http://localhost:9001`);
});

module.exports = app;