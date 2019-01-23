const Bull = require("bull");
const urls = require("./urls");

module.exports = new Bull("message-queue", urls.REDIS_URL);