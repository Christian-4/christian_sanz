const axios = require('axios')
const API_URL = 'http://localhost:9001/messages'

empty = (destination, body) => {
    axios.post(API_URL, { destination, body })
        .then(response => console.log("Test1: Fail"))
        .catch(err => {
            if (Object.values(err.response)[0] === 500) {
                console.log("Test1: Try Again, messageapp failed // statusCode should be 400 " + err)
                return
            }
            if (Object.values(err.response)[0] === 400) {
                console.log("Test1: OK")
                return
            }
        })
}
empty("", "") /*Destination & body couldnt be empty, statusCode should be 400*/

otherParams = (param1, param2) => {
    axios.post(API_URL, { param1, param2 })
        .then(response => console.log("Test2: Fail"))
        .catch(err => {
            if (Object.values(err.response)[0] === 500) {
                console.log("Test2: Fail")
                return
            }
            if (Object.values(err.response)[0] === 400) {
                console.log("Test2: OK")
                return
            }
        })
}
otherParams("Teo", "Hola") /*If params no include "destination or body" statusCode should be 400, and not be 500*/

noPayload = () => {
    axios.post(API_URL)
        .then(response => console.log("Test3: Fail"))
        .catch(err => {
            if (Object.values(err.response)[0] === 500) {
                console.log("Test3: Fail")
                return
            }
            if (Object.values(err.response)[0] === 400) {
                console.log("Test3: OK")
                return
            }
        })
}
noPayload() /*If there isnt payload statusCode should be 400, and not be 500*/

extraFields = (destination, body, extra) => {
    axios.post(API_URL, { destination, body, extra })
        .then(response => console.log("Test4: OK"))
        .catch(err => console.log("Test4: " + err))
}
extraFields("Teo", "Hola", "Extra") /*OK statusCode 200*/

let largeMessage

for (let i = 0; i <= 1000000; i++) {
    largeMessage += "Teo"
}

longBody = (destination, body) => {
    axios.post(API_URL, { destination, body })
        .then(response => console.log("Test5: Fail"))
        .catch(err => {
            if (Object.values(err.response)[0] === 413) {
                console.log("Test5: OK")
                return
            }
            if (Object.values(err.response)[0] !== 413) {
                console.log("Test5: Fail")
                return
            }
        })
}
longBody("Teo", largeMessage) /*OK statusCode 413*/

getMethod = () => {
    axios.get(API_URL)
        .then(response => console.log("Test6: Fail"))
        .catch(err => {
            if (Object.values(err.response)[0] === 404) {
                console.log("Test6: OK")
                return
            }
            if (Object.values(err.response)[0] !== 404) {
                console.log("Test6: Fail")
                return
            }
        })
}
getMethod() /*OK 404*/

putMethod = (destination, body) => {
    axios.put(API_URL, { destination, body })
        .then(response => console.log("Test7: Fail"))
        .catch(err => {
            if (Object.values(err.response)[0] === 404) {
                console.log("Test7: OK")
                return
            }
            if (Object.values(err.response)[0] !== 404) {
                console.log("Test7: Fail")
                return
            }
        })
}
putMethod("Teo", "Hola") /*OK statusCode 404*/