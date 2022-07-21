const express = require("express");
const { MongoClient } = require("mongodb");
const emailTester = require("../validators/emailValidator");
const newPasswordTester = require("../validators/passwordValidator");
const phoneTester = require("../validators/phoneValidator");
const genderTester = require("../validators/genderValidator");

const app = express();
let db;
let connectionString = `mongodb://localhost:27017/crud`;
MongoClient.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db();
  }
);

const middleware = {
  emailValidation: function (req, res, next) {
    const { email } = req.body;
    let count = 0;
    if (!emailTester(email.toLowerCase().replace(/\s/g, ""))) {
      res.status(400).send({ error: "please enter valid email" });
      return;
    }
    db.collection("data")
      .find({ email })
      .count({}, function (err, info) {
        if (err) throw err;
        count = info;
        if (count >= 1) {
          res.status(400).send({ error: "email already exists" });
        }
        return;
      });
    next();
  },
  passwordValidation: function (req, res, next) {
    const { password } = req.body;
    if (!newPasswordTester(password.trim())) {
      res.status(400).send({ error: "please enter valid password" });
      return;
    }
    next();
  },
  nameValidation: function (req, res, next) {
    const { firstName, lastName } = req.body;
    if (!firstName.trim() && typeof firstName !== "string") {
      res.status(400).send({ error: "please enter first name" });
      return;
    }
    if (lastName && typeof lastName !== "string") {
      res.status(400).send({ error: "please enter valid last name" });
      return;
    }
    next();
  },
  phoneValidation: function (req, res, next) {
    const { phone } = req.body;
    if (phone && !phoneTester(phone)) {
      res.status(400).send({ error: "please enter valid phone number" });
      return;
    }
    next();
  },
  genderValidation: function (req, res, next) {
    const { gender } = req.body;
    if (!genderTester(gender)) {
      res.status(400).send({ error: "please enter valid gender" });
      return;
    }
    next();
  },
};

module.exports = middleware;
