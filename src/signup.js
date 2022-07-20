const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const middleware  = require("../src/middleware/validatorMiddleware");

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
app.post(
  "/api/register",
  [
    middleware.emailValidation,
    middleware.passwordValidation,
    middleware.nameValidation,
    middleware.phoneValidation,
    middleware.genderValidation,
  ],
  async (req, res) => {
    const { email, password, firstName, lastName, gender, phone } = req.body;
    try {
      db.collection("data").insertOne(
        { email, password, firstName, lastName, gender, phone },
        function (err, info) {
          res.send().status(200);
        }
      );
    } catch (e) {}
  }
);
