# Mpesa Callback Listener

A listener for MPesa post requests from Safaricom's gateway API.

The app uses [CloudFunctions for Firebase](https://firebase.google.com/docs/functions/) to expose a publicly accessible endpoint, stores the transaction details in [Cloud Firestore](https://firebase.google.com/docs/firestore/).

Refactored from: [Mpesa Callback Listener](https://github.com/MarkNjunge/MPesaCallbackListener).

## Installation

```
git clone https://github.com/MachariaK/Lipa-Na-Mpesa-Online-Firestore-Cloud-Function.git

cd Lipa-Na-Mpesa-Online-Firestore-Cloud-Function

yarn install

cd functions 

npm install
```

## Deploy to Firebase

Run `firebase init functions`, choosing not to overwrite existing files.

Deploy using  
`firebase deploy --only functions`

## Endpoints

### /lmno_callback_url

Receives a callback for Lipa na MPesa transactions.  
It stores the transaction details in Firestore under `lmno_responses` for both successful and failed transactions.

