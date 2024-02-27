const admin = require("firebase-admin");
require("dotenv").config();

// Get credentials json from .env file
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS || "{}");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = app.firestore();

module.exports = { app, db };
