const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const loginController = require("../controllers/loginController")
const signupPController = require("../controllers/signupPController")
const signupGController = require("../controllers/signupGController")




var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/babyCareDB";

const TOKEN_SECRET =
  "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

const generateAccessToken = (username) => {
  return jwt.sign({ username }, TOKEN_SECRET);
};


router.get('/babyCareDB', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.error(err)
      return res.status(500).send(err);
    }
    else {
      console.log("Database created!");
      db.close();
      return res.send(err);
    }
    res.send();
  });
})



router.get("/createGovernessColection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) return res.status(500).send(err);
    var dbo = db.db("babyCareDB");
    dbo.createCollection("governess", function (err, response) {
      if (err) return res.status(500).send(err);
      console.log("Collection created!");
      db.close();
      return res.send('UserColection created')
    });
  });
})


router.get("/createParentsColection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) return res.status(500).send(err);
    var dbo = db.db("babyCareDB");
    dbo.createCollection("parents", function (err, response) {
      if (err) return res.status(500).send(err);
      console.log("Collection created!");
      db.close();
      return res.send('UserColection created')
    });
  });
})

router.get("/createChildrenColection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) return res.status(500).send(err);
    var dbo = db.db("babyCareDB");
    dbo.createCollection("children", function (err, response) {
      if (err) return res.status(500).send(err);
      console.log("Collection created!");
      db.close();
      return res.send('UserColection created')
    });
  });
})

router.get("/createVacationsColection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) return res.status(500).send(err);
    var dbo = db.db("babyCareDB");
    dbo.createCollection("vacations", function (err, response) {
      if (err) return res.status(500).send(err);
      console.log("Collection created!");
      db.close();
      return res.send('UserColection created')
    });
  });
})

router.get("/createEventsColection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) return res.status(500).send(err);
    var dbo = db.db("babyCareDB");
    dbo.createCollection("events", function (err, response) {
      if (err) return res.status(500).send(err);
      console.log("Collection created!");
      db.close();
      return res.send('UserColection created')
    });
  });
})

router.get("/createMessagesColection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) return res.status(500).send(err);
    var dbo = db.db("babyCareDB");
    dbo.createCollection("messages", function (err, response) {
      if (err) return res.status(500).send(err);
      console.log("Collection created!");
      db.close();
      return res.send('UserColection created')
    });
  });
})

router.get("/login", new loginController().login);
router.post("/signUpP", new signupPController().signUpP);
router.post("/signUpG", new signupGController().signUpG);
module.exports = router;

