/** @format */

const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const asyncWrapper = require("../utility/asyncError");
const expressError = require("../utility/expressError");
const passport = require("passport");

router
  .route("/register")
  .get((req, res) => {
    res.render("author/register");
  })
  .post(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new Author({ email, username });
      const registeredUser = await Author.register(user, password);
      req.flash("succes", "Welcome to National Parks");
      res.redirect("/parks");
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("succes", "Welcome to National Parks");
        res.redirect("/parks");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/register");
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("author/login");
  })
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    (req, res) => {
      req.flash("success", "You are in!");
      const redirectUrl = req.session.returnTo || "/parks";
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    }
  );

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Successfully Logged Out");
  res.redirect("/parks");
});

module.exports = router;
