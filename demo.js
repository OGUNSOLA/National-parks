const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test')
const test = require('./models/test');



const db = mongoose.connection;
console.log(test);