const functions = require("firebase-functions");
const admin = require("firebase-admin");
const parse = require("./parse");

admin.initializeApp();

exports.lmno_callback_url = functions.https.onRequest(async (req, res) => {
    const callbackData = req.body.Body.stkCallback;
    const parsedData = parse(callbackData);

    admin.database().ref("/lmno").push(parsedData);

    res.send("Completed");
});


