const mongoose = require('mongoose');



// MONGOOSE connection
mongoose.connect('mongodb://kcram:chickensarerockstars21@ds157654.mlab.com:57654/web4200', {useNewUrlParser: true});

// MONGOOSE models
const User = mongoose.model('User', {
  name: String,
  email: String,
  
});

const Plan = mongoose.model('Plan', {
    extDoor: String,
    intDoor: String,
    extSiding: String,
    flooring: String,
    countertops: String
})

module.exports = {
    User: User,
    Plan: Plan
}
