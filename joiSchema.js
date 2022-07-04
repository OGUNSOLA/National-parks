/** @format */

const Joi = require("joi");

module.exports.parkSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().min(0),
  //image: Joi.string().required(),
  location: Joi.string().required(),
  intro: Joi.string().required(),
  //deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  body: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
});