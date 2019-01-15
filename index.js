const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./src/routes/routes.js');
app.use('/', index);

app.listen(9001, () => {
    console.log(`Listening on http://localhost:9001`);
});

module.exports = app;