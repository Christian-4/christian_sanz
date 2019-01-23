const http = require("http");
const uuid = require("uuid/v1");

const queue = require("../queue");
const saveMessage = require("../clients/saveMessage");
const urls = require("../urls");

queue.process(function(job, done) {
  const messageData = Object.assign({}, job.data);
  const postOptions = {
    host: urls.MESSAGEAPP_HOST,
    port: 3000,
    path: "/message",
    method: "post",
    json: true,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify(messageData))
    }
  };

  let postReq = http.request(postOptions);

  console.log("Processing job");
  console.log(messageData);

  postReq.on("response", postRes => {
    if (postRes.statusCode === 200) {
      saveMessage(Object.assign(messageData, { status: "OK" }), done);
    } else {
      console.error("Error while sending message");
      saveMessage(Object.assign(messageData, { status: "ERROR" }), done);
    }
  });

  postReq.setTimeout(6000);

  postReq.on("timeout", () => {
    console.error("Timeout Exceeded!");
    postReq.abort();

    saveMessage(Object.assign(messageData, { status: "TIMEOUT" }), done);
  });

  postReq.on("error", () => {});

  postReq.write(JSON.stringify(messageData));
  postReq.end();
});

function processingMessage(messageParams) {
  return new Promise((ok, ko) => {
    saveMessage(messageParams, err => {
      if (err) {
        return ko(err);
      }
      return ok();
    });
  });
}

module.exports = function addJob(jobParams) {
  const messageId = uuid();
  const messageParams = Object.assign(
    {},
    jobParams,
    { _id: messageId },
    { status: "QUEUED" }
  );
  const jobOpts = {
    delay: 5000
  };

  return processingMessage(messageParams)
    .then(() => {
      return queue.add(messageParams, jobOpts);
    })
    .then(() => {
      return messageId;
    });
};
