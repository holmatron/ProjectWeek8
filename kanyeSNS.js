"use strict";
const AWS = require("aws-sdk");
AWS.config.region = "us-east-2";
const lambda = new AWS.Lambda();

const publishToSNS = async (message) => {
  const sns = new AWS.SNS();
  const params = {
    Message: message,
    TopicArn: "arn:aws:sns:us-east-2:235920682125:Kanye-topic",
    Subject: "Daily Kanye Quotes",
    //MessageAttributes:
  };

  return new Promise((resolve, reject) => {
    sns.publish(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.handler = (event, context) => {
  const params = {
    FunctionName: "kanye-api",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: "{ }",
  };

  lambda.invoke(params, (err, data) => {
    if (err) {
      context.fail(err);
    } else {
      publishToSNS(data.Payload);
      context.succeed(data.Payload);
    }
  });
};
