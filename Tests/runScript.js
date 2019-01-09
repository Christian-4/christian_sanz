const Client = require('./testScript').sendRequest

Client("1","get","messages")
//Error 404
Client("2","post","messages","5000",{destination:"User1", body:"Hello World"})
//OK
Client("3","post","messages","5000",{destination:"User1", message:"Hello World"})
//Timeout
Client("4","post","newPath","5000",{destination:"User1", body:"Hello World"})
//Error 404
Client("5","post","messages","5000",{destination:"", body:""})
//OK With empty fields, sometimes Error 500
Client("6","put","messages","5000",{destination:"User1", body:"Hello World"})
//Error 404
Client("7","post","messages","5000")
//Timeout

let message;
for(let i=0;i<1000000;i++){
  message+="C"
}

Client("8","post","messages","100000",{destination:"User1", body:message})
//OK, sometimes Error 413, to large.

Client("9","put","messages","5000",{destination:1, body:"Hello World"})
//Error 

Client("10","post","messages","5000",{})
//Error 404
Client("11","post","messages","5000",{destination:"User1"})
//Error 404
Client("12","post","messages","5000",{body:"Hello World"})
//Error 404