const locks = require("locks");
const mutex = locks.createMutex();

module.exports = mutex;