# MessageApp
***
### Guide to use this API
 
Requests: 
```
Method: GET
URL: http://localhost:9001/helloworld
response: Hello, World
```

```
Method: POST
Content-Type: 'application/json'
Request: 
{
  "destination": "STRING",
  "message": "STRING"
}
URL: http://localhost:9001/messages
response: OK, message sent
```

*Example:*
{
  "destination": "User",
  "message": "Hello, how are you?"
}

*Responses:*

Status 200 (success):
```
Hello, World
OK, message sent
```

Status 400 (Client error):
```
'destination' and 'message' parameters are requireds
'destination' and 'message' parameters cant be empty
'destination' and 'message' parameters must be strings
```

Status 413 (Client error):
```
'destination' respect 50 characters and 'message' respect 128
```

Status 500 (Server error):
```
INTERNAL SERVER ERROR, Error to send the message
Error to send the message
```