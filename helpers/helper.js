/** @format */

const NationalPark = require("../models/parks");
const { parkSchema, reviewSchema } = require("../joiSchema");
const ExpressError = require("../utility/expressError");
const Review = require("../models/reviews");

module.exports.validatePark = (req, res, next) => {
  const { error } = parkSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    return res.redirect("/login");
  }

  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const park = await NationalPark.findById(id);
  console.log(park);
  if (!park.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to edit");
    return res.redirect(`/parks/${id}`);
  }
  next();
};
