/*jshint esversion: 6*/

const express     = require('express'),
      router      = express.Router(),
      passport    = require('passport'),
      User        = require('../models/user');

//Register GET Route
router.get("/register", function(req, res) {
  res.render("auth/register");
});

//Register POST Route
router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.redirect("auth/register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});

//Login GET Route
router.get("/login", function(req, res) {
    res.render("auth/login");
});

//Login POST Route
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {

});

//Logout GET Route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged out!!!")
  res.redirect("campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


module.exports = router;