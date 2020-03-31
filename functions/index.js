const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const callbackHandler = require("./callbackUrl");

exports.lmno_callback_url = functions.https.onRequest(callbackHandler);

