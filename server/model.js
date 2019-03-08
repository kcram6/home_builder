const mongoose = require('mongoose');
const moment = require('moment');



// MONGOOSE connection
mongoose.connect('mongodb://kcram:chickensarerockstars21@ds157654.mlab.com:57654/web4200', {useNewUrlParser: true});

// MONGOOSE models

const userSchema = new mongoose.Schema({
  registerName: {
    type: String,
    required: [true, "Name is required when registering."]
  },
  registerEmail: {
    type: String,
    required: [true, "Email is required when registering."]
  }
});

const User = mongoose.model('User', userSchema);



const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: [true, "You must add an identifing name for the plan."]
  },
  planDate: {
    type: Date,
    required: true,
    default: moment().format('MMMM Do, YYYY')
  },
  pickedExtDoor: {
    type: String,
    required: [true, "You must make an exterior door selection."]
    // enum: [ "extDoor1.png", "extDoor2.png", "extDoor3.png"]
  },
  pickedIntDoor: {
    type: String,
    required: [true, "You must make an interior door selection."]
  },
  pickedExtSiding: {
    type: String,
    required: [true, "You must make a siding selection."]
  },
  pickedFlooring: {
    type: String,
    required: [true, "You must make a flooring selection."]
  },
  pickedCountertop: {
    type: String,
    required: [true, "You must make a countertop selection."]
  }
});

const Plan = mongoose.model('Plan', planSchema);


module.exports = {
    User: User,
    Plan: Plan
}



