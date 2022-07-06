/** @format */

const express = require("express");
const router = express.Router();
const NationalPark = require("../models/parks");
const asyncWrapper = require("../utility/asyncError");
const ExpressError = require("../utility/expressError");
const { validatePark, isLoggedIn, isOwner } = require("../helpers/helper");
const reviews = require("../models/reviews");
const { storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { cloudinary } = require("../cloudinary");

router
  .route("/")
  .get(async (req, res) => {
    const parks = await NationalPark.find({}).populate("author");
    res.render("parks/index", { parks });
  })
  .post(
    isLoggedIn,
    upload.array("image"),
    validatePark,

    asyncWrapper(async (req, res, next) => {
      const body = req.body;

      if (!body) {
        throw new ExpressError("Missing info", 400);
        req.flash("error", "Campground not created");
      }
      const park = await new NationalPark(body);
      park.images = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
      }));
      park.author = req.user._id;

      await park.save();
      req.flash("success", "Campground created");
      res.redirect(`/parks/${park._id}`);
    })
  );

router.get("/new", isLoggedIn, (req, res) => {
  res.render("parks/new");
});

router
  .route("/:id")
  .get(
    asyncWrapper(async (req, res) => {
      const park = await NationalPark.findById(req.params.id)
        .populate({
          path: "reviews",
          populate: {
            path: "author",
          },
        })
        .populate("author");
      if (!park) {
        req.flash("error", "Cannot find park");
        res.redirect("/parks");
      }
      res.render("parks/show", { park });
    })
  )
  .put(
    isLoggedIn,
    validatePark,
    isOwner,
    upload.array("image"),
    asyncWrapper(async (req, res, next) => {
      const { id } = req.params;
      const park = await NationalPark.findByIdAndUpdate(id, { ...req.body });

      const imgs = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
      }));
      park.images.push(...imgs);
      await park.save();
      if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
          await cloudinary.uploader.destroy(filename);
        }
        await park.updateOne({
          $pull: {
            images: {
              filename: {
                $in: req.body.deleteImages,
              },
            },
          },
        });
      }
      req.flash("success", "Campground updated");
      res.redirect(`/parks/${park._id}`);
    })
  )
  .delete(
    isLoggedIn,
    isOwner,
    asyncWrapper(async (req, res, next) => {
      const { id } = req.params;
      await NationalPark.findByIdAndDelete(id);
      req.flash("success", "Campground deleted");
      res.redirect("/parks");
    })
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const park = await NationalPark.findById(id);

    res.render("parks/edit", { park });
  })
);

module.exports = router;
