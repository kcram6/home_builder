const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const model = require('./model.js');
// const moment = require('moment');



// app/middleware setup

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());




// LIST ACTION
app.get('/plans', (req, res) => {
  model.Plan.find().then(function (plans) {
    res.json(plans);
  });
});

app.get('/users', (req, res) => {
  model.User.find().then(function (users) {
    res.json(users);
  });
});


// CREATE ACTION
app.post('/users', (req, res) => {
  console.log("the body", req.body);

  if (!req.body.registerName || !req.body.registerEmail) {
    res.sendStatus(422);
    return;
  }

  let user = new model.User({
    registerEmail: req.body.registerEmail,
    registerName: req.body.registerName
  });

  user.save().then(function () {
    res.sendStatus(201);
  }, function(err) {
    if (err.errors) {
      var message = {};
      for (var e in err.errors) {
        message[e] = err.errors[e].message;
      }
      console.log("validation error saving user", messages);
      res.status(422).json(message);
    } else {
      console.log("unexpected error saving user", err);
      res.status(500).json({err:"server error"});
    }
  });
});



app.post('/plans', (req, res) => {
  console.log("the body", req.body);

  let plan = new model.Plan({
    planName: req.body.planName,
    pickedExtDoor: req.body.pickedExtDoor,
    pickedIntDoor: req.body.pickedIntDoor,
    pickedExtSiding: req.body.pickedExtSiding,
    pickedFlooring: req.body.pickedFlooring,
    pickedCountertop: req.body.pickedCountertop,
    planDate: new Date()
  });


  plan.save().then(function () {
    res.sendStatus(201);
  }, function(err) {
    if (err.errors) {
      var message = {};
      for (var e in err.errors) {
        message[e] = err.errors[e].message;
      }
      console.log("validation error saving plan", message);
      res.status(422).json(message);
    } else {
      console.log("unexpected error saving plan", err);
      res.status(500).json({err:"server error"});
    }
  });
});






// RETRIEVE ACTION
app.get('/plans/:id', (req, res) => {
  console.log("the id:", req.params.id);

  model.Plan.findOne({ _id: req.params.id }).then(function (plan) {
    if (plan) {
      res.json(plan);
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
app.put('/plans/:id', (req, res) => {
  console.log("the id:", req.params.id);

  model.Plan.findOne({ _id: req.params.id }).then(function (plan) {
    if (plan) {
      plan.make = req.body.make;
      plan.model = req.body.model;
      plan.range = req.body.range;
      plan.planDate = new Date();

      plan.save().then(function () {
        
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
app.delete('/plans/:id', (req, res) => {
  console.log("the id:", req.params.id);

  model.Plan.findOne({ _id: req.params.id }).then(function (plan) {
    if (plan) {
      plan.delete().then(function () {
        res.json(plan);
      });
    } else {
      // query succeeded, but nothing found
      console.log('no id matching found');
      res.sendStatus(404);
    }
  }, function (err) {
    // query error!
    console.log('query error')
    res.sendStatus(400);
  });
});


app.listen(8080, () => {
  console.log("Server is listening.");
});


