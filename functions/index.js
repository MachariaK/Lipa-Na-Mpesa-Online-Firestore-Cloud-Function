const functions = require("firebase-functions");
const admin = require("firebase-admin");
const parse = require("./parse");

admin.initializeApp();

exports.lmno_callback_url = functions.https.onRequest(async (req, res) => {
    const callbackData = req.body.Body.stkCallback;
    const parsedData = parse(callbackData);

    let lmnoResponse = admin.firestore().collection('lmno_responses').doc('/' + parsedData.checkoutRequestID + '/');
    let transaction = admin.firestore().collection('transactions').doc('/' + parsedData.checkoutRequestID + '/');
    let wallets = admin.firestore().collection('wallets');

    if ((await lmnoResponse.get()).exists) {
        await lmnoResponse.update(parsedData);
    } else {
        await lmnoResponse.set(parsedData);
    }
    if ((await transaction.get()).exists) {
        await transaction.update({
            'amount': parsedData.amount,
            'confirmed': true
        });
    } else {
        await transaction.set({
            'moneyType': 'money',
            'type': 'deposit',
            'amount': parsedData.amount,
            'confirmed': true
        });
    }
    let walletId = await transaction.get().then(value => value.data().toUserId);

    let wallet = wallets.doc('/' + walletId + '/');

    if ((await wallet.get()).exists) {
        let balance = await wallet.get().then(value => value.data().balance);
        await wallet.update({
            'balance': parsedData.amount + balance
        })
    } else {
        await wallet.set({
            'balance': parsedData.amount
        })
    }

    res.send("Completed");
});




