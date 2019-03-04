const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const model = require('./model.js');



// app/middleware setup

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())




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
  });
});


app.post('/plans', (req, res) => {
  console.log("the body", req.body);

  if (!req.body.make) {
    res.sendStatus(422);
    return;
  }

  let plan = new model.Plan({
    make: req.body.make,
    model: req.body.model,
    range: req.body.range
  });

  plan.save().then(function () {
    res.sendStatus(201);
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
      alert('no id matching found');
      res.sendStatus(404);
    }
  }, function (err) {
    // query error!
    alert('query error')
    res.sendStatus(400);
  });
});


app.listen(8080, () => {
  console.log("Server is listening.");
});


