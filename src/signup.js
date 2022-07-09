const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const emailTester = require("../src/validators/emailValidator");
const newPasswordTester = require("../src/validators/passwordValidator");

const app = express();
let db;
let connectionString = `mongodb://localhost:27017/crud`;
MongoClient.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db();
    app.listen(9999);
  }
);

app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.post("/api/register", async (req, res) => {
  const { email, password, firstName, lastName, gender, phone } = req.body;
  try {
    if (!emailTester(email)) {
      res.status(404).json({ error: "please enter email" });
      return;
    } else if (!newPasswordTester(password)) {
      res.status(404).json({ error: "please enter password" });
      return;
    } else {
      db.collection("data").insertOne(
        { email, password, firstName, lastName, gender, phone},
        function (err, info) {
          res.send().status(200);
        }
      );
    }
  } catch (e) {}
});
