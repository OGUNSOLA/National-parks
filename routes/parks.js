/** @format */

const express = require("express");
const router = express.Router();
const NationalPark = require("../models/parks");
const asyncWrapper = require("../utility/asyncWrapper");
const { validatePark, isLoggedIn, isOwner } = require("../helpers/helper");
const { storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.mapboxToken;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

router
  .route("/")
  .get(async (req, res) => {
    const parks = await NationalPark.find({}).populate("author");
    res.render("parks/index", { parks });
  })
  .post(
    // isLoggedIn,
    // upload.array("image"),
    // validatePark,

    // asyncWrapper(async (req, res, next) => {
    //   const body = req.body;
    //   const geoData = await geocoder
    //     .forwardGeocode({
    //       query: body.location,
    //       limit: 1,
    //     })
    //     .send();

    //   if (!body) {
    //     throw new ExpressError("Missing info", 400);
    //     req.flash("error", "park not created");
    //   }
    //   const park = await new NationalPark(body);
    //   park.geometry = geoData.body.features[0].geometry;
    //   park.images = req.files.map((file) => ({
    //     url: file.path,
    //     filename: file.filename,
    //   }));
    //   park.author = req.user._id;

    //   await park.save();
    //   console.log(park);
    //   req.flash("success", "Park created");
    //   return res.redirect(`/parks/${park._id}`);
    // })

    isLoggedIn,
    upload.array("image"),
    validatePark,

    asyncWrapper(async (req, res, next) => {
      const geoData = await geocoder
        .forwardGeocode({
          query: req.body.location,
          limit: 1,
        })
        .send();


      req.files.map((f) => ({ url: f.path, filename: f.filename }));
      const park = new NationalPark(req.body);
      park.geometry = geoData.body.features[0].geometry;
      park.images = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
      park.author = req.user._id;
      await park.save();
      req.flash("success", "park created");
      res.redirect("/parks");
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
    isOwner,
    upload.array("image"),
    validatePark,
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
      req.flash("success", "park updated");
      res.redirect(`/parks/${park._id}`);
    })
  )
  .delete(
    isLoggedIn,
    isOwner,
    asyncWrapper(async (req, res, next) => {
      const { id } = req.params;
      await NationalPark.findByIdAndDelete(id);
      req.flash("success", "park deleted");
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
