
var MongoClient = require('mongodb').MongoClient;
const jwt = require("jsonwebtoken");
var url = "mongodb://localhost:27017/babyCareDB";

class Login {
    TOKEN_SECRET = "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

    generateAccessToken = (username) => {
        return jwt.sign({ username }, TOKEN_SECRET);
    };

    login = (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        const { user, password } = req.query;
        MongoClient.connect(url, async function (err, db) {
            if (err)
                return res.status(500).send(err);
            var dbo = db.db("babyCareDB");
            var query = { email: user, password: password };
            dbo.collection("governess").findOne(query, function (err, result) {
                if (err) throw err;
                if (result) {
                    return res.json({ kind: 'governess', result });
                }

                db.close();
            });

            dbo.collection("parents").findOne(query, function (err, result) {
                if (err) throw err;
                if (result) {
                    return res.json({ kind: 'parents', result });
                }
                db.close();
            });


        });

    }
}
module.exports = Login;