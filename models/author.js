/** @format */

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

authorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Author", authorSchema);
