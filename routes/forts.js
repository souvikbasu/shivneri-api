var express = require('express');
var fortsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

fortsRouter.route('/')
  .get(function (req, res) {
    var url = 'mongodb://accountAdmin01:changeMe@localhost:27017/fortlisting';
    mongodb.connect(url, function (err, db) {
      if (err) {
        console.log(err);
        return;
      };
      var collection = db.collection('fortlist');
      collection.find().toArray(
        function (err, results) {
          res.json(results);
          db.close();
        });
    });
  });

module.exports = fortsRouter;
