"use strict";
const https = require("https");
const AWS = require("aws-sdk");

exports.handler = async (event) => {
  try {
    const result1 = await getKanye();
    const result2 = await getMeow();
    const result3 = await getKanye();
    const viesti =
      "Kanye quote of the day: " +
      result1.quote +
      ". " +
      result2.data +
      ". " +
      result3.quote;

    return viesti;
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
          resolve(JSON.parse(rawData));
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
          resolve(JSON.parse(rawData));
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
