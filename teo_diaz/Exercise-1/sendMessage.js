const axios = require('axios')
const API_URL = 'http://exercise-1_messageapp_1:3000/message'

const sendMessage = (req) =>{
  const { destination, body } = req.body;
  return axios
    .post(API_URL, { destination, body })
  }

module.exports = sendMessage;
