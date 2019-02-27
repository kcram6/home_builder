// // const bodyParser = require('body-parser');
// const express = require('express');


// //app and middleware setup
// let app = express(); //calls express like a function and returns an express object that you can use to configure(app)
// // app.use(bodyParser.urlencoded({ extended:false }));


// app.listen(8080, () => {
//     console.log('listening on 8080');
// })


const bodyParser = require('body-parser');
const express = require('express');
const model = require('./model.js');






// app/middleware setup

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));




// LIST ACTION
app.get('/vehicles', (req, res) => {
  // console.log("the color:", req.query.color);

  Vehicle.find().then(function (vehicles) {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(vehicles);
  });
});

// CREATE ACTION
app.post('/vehicles', (req, res) => {
  console.log("the body", req.body);

  if (!req.body.make || !req.body.model || !req.body.range) {
    res.sendStatus(422);
    return;
  }

  let vehicle = new Vehicle({
    make: req.body.make,
    model: req.body.model,
    range: req.body.range
  });

  vehicle.save().then(function () {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendStatus(201);
  });
});

// RETRIEVE ACTION
app.get('/vehicles/:id', (req, res) => {
  console.log("the id:", req.params.id);

  Vehicle.findOne({ _id: req.params.id }).then(function (vehicle) {
    if (vehicle) {
      res.set("Access-Control-Allow-Origin", "*");
      res.json(vehicle);
    } else {
      // query succeeded, but nothing found
      res.sendStatus(404);
    }
  }, function (err) {
    // query error!
    res.sendStatus(400);
  });
});

// UPDATE/REPLACE ACTION
app.put('/vehicles/:id', (req, res) => {
  console.log("the id:", req.params.id);

  Vehicle.findOne({ _id: req.params.id }).then(function (vehicle) {
    if (vehicle) {
      vehicle.make = req.body.make;
      vehicle.model = req.body.model;
      vehicle.range = req.body.range;

      vehicle.save().then(function () {
        res.set("Access-Control-Allow-Origin", "*");
        res.sendStatus(200);
      });
    } else {
      // query succeeded, but nothing found
      res.sendStatus(404);
    }
  }, function (err) {
    // query error!
    res.sendStatus(400);
  });
});

// DELETE ACTION
app.delete('/vehicles/:id', (req, res) => {
  console.log("the id:", req.params.id);

  Vehicle.findOne({ _id: req.params.id }).then(function (vehicle) {
    if (vehicle) {
      vehicle.delete().then(function () {
        res.set("Access-Control-Allow-Origin", "*");
        res.json(vehicle);
      });
    } else {
      // query succeeded, but nothing found
      res.sendStatus(404);
    }
  }, function (err) {
    // query error!
    res.sendStatus(400);
  });
});


app.listen(8080, () => {
  console.log("Server is listening.");
});


