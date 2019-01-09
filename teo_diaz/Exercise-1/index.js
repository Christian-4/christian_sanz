const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sendMessage = require('./sendMessage');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is my first, 'Hello World'");
});

app.post("/messages",(req,res)=>{
  sendMessage(req)
  .then(response => res.status(200).send(`${response.data}`))
  .catch(err => res.status(500).send(`There was an Error: ${err}`))
});

app.listen(9001, () => {
  console.log("I'm ready on port 9001!");
});
