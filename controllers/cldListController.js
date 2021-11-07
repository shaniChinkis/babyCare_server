
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/babyCareDB";

class CldListById {

    getCldList = (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        const { email } = req.query;
        MongoClient.connect(url, async function (err, db) {
            if (err)
                return res.status(500).send(err);
            var dbo = db.db("babyCareDB");
            var query = { email: email };
            dbo.collection("parents").findOne(query, function (err, result) {
                if (err) throw err;
                if (result) {
                    return res.json({ result });
                }

                db.close();
            });
        });

    }
}
module.exports = CldListById;