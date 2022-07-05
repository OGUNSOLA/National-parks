/** @format */

const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrapper = require("../utility/asyncError");
const ExpressError = require("../utility/expressError");
const NationalPark = require("../models/parks");
const Review = require("../models/reviews");
const {
  validateReview,
  isLoggedIn,
  isReviewOwner,
} = require("../helpers/helper");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router.route("/").get("/", (req, res) => {
//   res.send("Home");
// });
router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const park = await NationalPark.findById(id);
    const review = new Review(req.body);
    review.author = req.user._id;
    park.reviews.push(review);
    await review.save();
    await park.save();
    req.flash("success", "New Review created");
    res.redirect(`/parks/${park.id}`);
  })
);

router.delete(
  "/:reviewid",
  isLoggedIn,
  isReviewOwner,
  asyncWrapper(async (req, res) => {
    const { id, reviewid } = req.params;
    const park = await NationalPark.findByIdAndUpdate(req.params.id);
    await park.updateOne(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review deleted");
    res.redirect(`/parks/${id}`);
  })
);
module.exports = router;
