const express = require('express');
const app = express();

app.get("/holamundo", (req, res, next) => {
    res.status(200).json("Hola, mundo");
});

app.listen(9001, () => {
    console.log(`Listening on http://localhost:9001`);
});

module.exports = app;