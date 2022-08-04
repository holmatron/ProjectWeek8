"use strict";
const https = require("https");
const AWS = require("aws-sdk");

exports.handler = async (event) => {
  try {
    const result1 = await getKanye();
    //const result1JSON = JSON.parse(result1.quote)
    const result2 = await getMeow();
    //const result2JSON = JSON.parse(result2.data)
    const result3 = await getKanye();
    //const result3JSON = JSON.parse(result3.quote)
    const viesti = result1 + result2 + result3;

    return result1 + result2 + result3;
  } catch (error) {
    console.log("Error is: 👉️", error);
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};

function getKanye() {
  const url = "https://api.kanye.rest";

  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let rawData = "";

      res.on("data", (chunk) => {
        rawData += chunk;
      });

      res.on("end", () => {
        try {
          resolve(rawData);
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(err));
    });
  });
}

function getMeow() {
  const url = "https://meowfacts.herokuapp.com/";

  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let rawData = "";

      res.on("data", (chunk) => {
        rawData += chunk;
      });

      res.on("end", () => {
        try {
          resolve(rawData);
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(err));
    });
  });
}
