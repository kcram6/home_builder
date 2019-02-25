// const bodyParser = require('body-parser');
const express = require('express');


//app and middleware setup
let app = express(); //calls express like a function and returns an express object that you can use to configure(app)
// app.use(bodyParser.urlencoded({ extended:false }));









app.listen(8080, () => {
    console.log('listening on 8080');
})

