/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewShema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
});

module.exports = mongoose.model("Review", reviewShema);
