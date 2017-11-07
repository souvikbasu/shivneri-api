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

      var query = req.query.search || '';
      var limit = Number(req.query.limit) || 0;
      var skip = Number(req.query.skip) || 0;
      var sortBy = req.query.sortBy || fortName;
      var sortOrder = Number(req.query.sortOrder) || 1;
      pattern= query;

      let sortOption = {};
      sortOption[sortBy] = sortOrder;
      let options={
          "limit": limit,
          "skip": skip,
          "sort": sortOption
      }

      if(query){
       collection.find({$or:[{fortPlace : {$regex :pattern,$options: "i"  }},{fortName : {$regex :pattern,$options: "i"  }}]},options).toArray(
        function (err, results) {
          res.json(results);
          db.close();
        });
      }else{
      collection.find({}).toArray(
        function (err, results) {
          console.log(options);
          res.json(results);
          db.close();
        });
      }
    });
  });



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
