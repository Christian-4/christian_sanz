const axios = require('axios')

const urlBase = "http://christian_sanz_messageapp_1:3000"

const sendMessage = (destination, body) => {
    return axios({ method: "post", url: `${urlBase}/message`, timeout: 3000, data: { destination, body } })
}

module.exports = sendMessage;
