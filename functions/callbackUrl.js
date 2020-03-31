const admin = require("firebase-admin");

const app = require("express")();
const cors = require("cors");
const parse = require("./parse");

const db = admin.database();

app.use(cors({ origin: true }));

app.post("/:token", (req, res) => {
  const callbackData = req.body.Body.stkCallback;
  const parsedData = parse(callbackData);

  if (parsedData.resultCode === 0) {
    sendNotification(
      "Wallet Top Up",
      "Your transaction was successful.",
      req.params.token
    );
    db.ref("lmno/successful").push(parsedData, error => {
      if (error) {
        console.log(error);
      } else {
        console.log("Transaction saved to database.");
      }
    });
  } else {
    sendNotification(
      "Wallet Top Up",
      "Your transaction was not successful.",
      req.params.token
    );
    db.ref("lmno/failed").push(parsedData);
  }
  res.send("Completed");
});

function sendNotification(title, body, token) {
  const payload = { notification: { title, body } };
  return admin.messaging().sendToDevice(token, payload);
}

module.exports = app;
