const getCredit = require("../clients/getCredit");
const sendMessage = require("../jobs/sendMessage");

module.exports = function(req, res) {
  const query = getCredit();

  query.exec(function(err, credit) {
    if (err) return console.log(err);

    current_credit = credit[0].amount;

    if (current_credit > 0) {
      sendMessage(req.body)
        .then(messageId => {
          const response = {
            messageId
          };

          res.statusCode = 200;
          res.end(JSON.stringify(response));
        });
    } else {
      res.statusCode = 500;
      res.end("No credit error");
    }
  });
};
