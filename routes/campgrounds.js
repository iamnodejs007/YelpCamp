/*jshint esversion: 6*/

const express = require('express'),
      router  = express.Router(),
      Campground  = require("../models/campground");

router.get("/", function(req, res) {
  Campground.find({},
    function (err, camps) {
      if (err) {
        console.log(err);
      } else {
  res.render("campgrounds/index", {campgrounds: camps});
      }
  });
});

router.post("/", isLoggedIn, function(req, res) {
  let name  = req.body.name;
  let image = req.body.image;
  let desc  = req.body.description;
  let newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newcamp) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {

  Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: camp});
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;