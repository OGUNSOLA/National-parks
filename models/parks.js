/** @format */

const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const review = require("./reviews");

const parkSchema = new Schema({
  name: String,
  price: Number,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  intro: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  // geometry: {
  //   // type: {
  //   //   type: String,
  //   //   enum: ["Point"],
  //   //   //required: true,
  //   // },
  //   coordinates: {
  //     type: [Number],
  //     // required: true,
  //   },
  // },
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
