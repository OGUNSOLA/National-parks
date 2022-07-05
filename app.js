/** @format */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const parksRouter = require("./routes/parks");
const reviewRouter = require("./routes/reviews");
const authorRouter = require("./routes/users");
const ejsMate = require("ejs-mate");
const NationalPark = require("./models/parks");
const bodyParser = require("body-parser");
const ExpressError = require("./utility/expressError");
const session = require("express-session");
const flash = require("connect-flash");
const Author = require("./models/author");
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://localhost:27017/national-parks");

const db = mongoose.connection;
db.once("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});
const secret = process.env.secret || "secret";

const sessionConfig = {
  name: "mySessionId",
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //secure:true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Author.authenticate()));
passport.serializeUser(Author.serializeUser());
passport.deserializeUser(Author.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", authorRouter);
app.use("/parks", parksRouter);
app.use("/parks/:id/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  const { message } = err;
  res.status(statusCode).render("error", { message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
