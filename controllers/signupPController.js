
var MongoClient = require('mongodb').MongoClient;
const jwt = require("jsonwebtoken");
var url = "mongodb://localhost:27017/babyCareDB";

class SignUpP {
    TOKEN_SECRET = "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

    generateAccessToken = (username) => {
        return jwt.sign({ username }, TOKEN_SECRET);
    };
    signUpP = (req, res) => {
        const { user, password, governessCode, childName,childId} = req.body; 
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("babyCareDB");
            var parent = { username: user, password,governessCode, childName,childId };
            dbo.collection("parents").insertOne(parent, function (err, res) {
                if (err) throw err;
                db.close();
            });
            const token = generateAccessToken(user);
            console.log("token", token);
            return res.json({ token }).send();
        });
    }
}
module.exports = SignUpP;