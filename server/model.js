const mongoose = require('mongoose');



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
  extDoor: {
    type: String,
    required: [true, "You must make an exterior door selection."]
    // enum: [ "extDoor1.png", "extDoor2.png", "extDoor3.png"]
  },
  intDoor: {
    type: String,
    required: [true, "You must make an interior door selection."]
  },
  extSiding: {
    type: String,
    required: [true, "You must make a siding selection."]
  },
  flooring: {
    type: String,
    required: [true, "You must make a flooring selection."]
  },
  countertops: {
    type: String,
    required: [true, "You must make a countertop selection."]
  }
});

const Plan = mongoose.model('Plan', planSchema);


module.exports = {
    User: User,
    Plan: Plan
}



