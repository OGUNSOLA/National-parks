/** @format */

const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const review = require("./reviews");

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const parkSchema = new Schema({
  name: String,
  price: Number,
  images: [imageSchema],
  intro: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
});

parkSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Parks", parkSchema);
