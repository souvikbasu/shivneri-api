var express = require('express');
var fortsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');


//fetch all the results and filter based on query string and sorting
fortsRouter.route('/')
   .post(function(req,res){
    var url = 'mongodb://accountAdmin01:changeMe@localhost:27017/fortlisting';
    mongodb.connect(url, function (err, db) {
      if (err) {
        console.log(err);
        return;
      };
      var fort = {  fortImage_url: req.body.fortImage_url,  fortName:req.body.fortName, fortPlace: req.body.fortPlace, fortConstructedYear: req.body.fortConstructedYear };
      var collection = db.collection('fortlist');
      collection.insert(fort,
        function (err, results) {
          res.send(results);
          db.close();
        });
    });
        
   })
  .get(function (req, res) {
    var url = 'mongodb://accountAdmin01:changeMe@localhost:27017/fortlisting';
    mongodb.connect(url, function (err, db) {
      if (err) {
        console.log(err);
        return;
      };
      var collection = db.collection('fortlist');
      var query = req.query;
      collection.find(query).sort({'fortName':-1}).toArray(
        function (err, results) {
          res.json(results);
          db.close();
        });
    });
  });


//insert the result (post)
//fetch the data according to the ID (GET)

fortsRouter.route('/:id')
.get(function (req, res) {
  var Id = new objectId(req.params.id);
  var url = 'mongodb://accountAdmin01:changeMe@localhost:27017/fortlisting';
  mongodb.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return;
    };
    var collection = db.collection('fortlist');
    collection.findOne({'_id':Id},
      function (err, results) {
        res.json(results);
        db.close();
      }
    );
  });
})
//put method to edit 
.put(function (req, res) {
  var Id = new objectId(req.params.id);
  var url = 'mongodb://accountAdmin01:changeMe@localhost:27017/fortlisting';
  mongodb.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return;
    };
    var collection = db.collection('fortlist');

    collection.findOne({'_id':Id},
      function (err, results) {
        results.fortImage_url=req.body.fortImage_url,
        results.fortName=req.body.fortName,
        results.fortPlace=req.body.fortPlace,
        results.fortConstructedYear=req.body.fortConstructedYear,
        res.json(results);
        db.close();
      }
    );
  });
})
//delete method
.delete(function (req, res) {
  var Id = new objectId(req.params.id);
  var url = 'mongodb://accountAdmin01:changeMe@localhost:27017/fortlisting';
  mongodb.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return;
    };
    var collection = db.collection('fortlist');

    collection.deleteOne({'_id':Id},
      function (err, results) {
        res.send('removed');
        db.close();
      }
    );
  });
});
//sort the fortname in a asc and desc


//input field search ( get)
//fetch the data based o given page number and no. of item




module.exports = fortsRouter;
