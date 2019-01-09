const axios = require('axios')

const urlBase = "http://christian_sanz_messageapp_1:3000"

const sendMessage = (destination, body) => {
    return axios.post(`${urlBase}/message`, { destination, body })
        .then(response => response)
        .catch(err => err.response)
}

module.exports = sendMessage;
            