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
//const helmet = require("helmet");

const LocalStrategy = require("passport-local");
const mongoSanitize = require("express-mongo-sanitize");

const dbURL = process.env.DB_url || "mongodb://localhost:27017/national-parks";
//const dbURL = "mongodb://localhost:27017/national-parks";

const MongoDBStore = require("connect-mongo")(session);

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(dbURL);

const db = mongoose.connection;
db.once("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});
const secret = process.env.secret || "secret";

const store = new MongoDBStore({
  url: dbURL,
  secret,
  touchAfter: 24 * 60 * 60,
});

const sessionConfig = {
  store,
  name: "parkSessionId",
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
app.use(mongoSanitize());

//app.use(helmet({ crossOriginEmbedderPolicy: false }));

// const scriptSrcUrls = [
//   "https://stackpath.bootstrapcdn.com",
//   "https://api.tiles.mapbox.com",
//   "https://api.mapbox.com",
//   "https://kit.fontawesome.com",
//   "https://cdnjs.cloudflare.com",
//   "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//   "https://kit-free.fontawesome.com",
//   "https://stackpath.bootstrapcdn.com",
//   "https://cdn.jsdelivr.net",
//   "https://api.mapbox.com",
//   "https://api.tiles.mapbox.com",
//   "https://fonts.googleapis.com",
//   "https://use.fontawesome.com",
// ];
// const connectSrcUrls = [
//   "https://api.mapbox.com",
//   "https://*.tiles.mapbox.com",
//   "https://events.mapbox.com",
// ];
// const fontSrcUrls = [];
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", "blob:"],
//       childSrc: ["blob:"],
//       objectSrc: [],
//       imgSrc: [
//         "'self'",
//         "blob:",
//         "data:",
//         "https://res.cloudinary.com/dbb9ypmi0/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
//         "https://images.unsplash.com",
//       ],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   })
// );

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

app.get("/", (req, res) => {
  res.render("home");
});

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
