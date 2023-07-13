const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// body parser for json data
app.use(express.json());

// cross origin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// api endpoints
app.get("/", (req, res) => {
  return res.send("hello world");
});

// routes
app.use("/api/user", require("./routes/user"));

// firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.app = functions.https.onRequest(app);
