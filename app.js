/*jshint esversion: 6*/

const express       = require('express'),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      methodOverride= require('method-override'),
      Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      seed          = require("./seeds"),
      flash         = require("connect-flash"),
      app           = express(),

      PORT          = process.env.PORT || 5000;

const commentRoutes = require("./routes/comments"),
      campRoutes    = require("./routes/campgrounds"),
      authRoutes    = require("./routes/auth");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp";
mongoose.connect(url);


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

//seed();

app.locals.moment = require('moment');

//Passportjs Configuration
app.use(require('express-session')({
  secret: "this is my secret key",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.get("/", function(req, res) {

  res.render("landing");
});



app.use(authRoutes);
app.use("/campgrounds", campRoutes);
app.use("/campgrounds/:id/comments",commentRoutes); //can get the id because of mergeparams: true in commentsjs

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
  console.log("Yelp camp Server has started on port: " + PORT);
  }
});

