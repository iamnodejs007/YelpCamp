/*jshint esversion: 6*/

const express = require('express'),
      router  = express.Router(),
      Campground  = require("../models/campground"),
      middleware  = require("../middleware"),
      geocoder    = require("geocoder");

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

router.post("/", middleware.isLoggedIn, function(req, res) {
  var name          = req.body.name,
      price         = req.body.price,
      image         = req.body.image,
      desc          = req.body.description,
      author        = {
        id:       req.user._id,
        username: req.user.username
      };
  geocoder.geocode(req.body.location, function(err, data) {
    var lat       = data.results[0].geometry.location.lat,
        lng      = data.results[0].geometry.location.lng,
        location  = data.results[0].formatted_address;
    var newCampground = {
        name:         name,
        price:        price,
        image:        image,
        description:  desc,
        location:     location,
        lat:          lat,
        lng:          lng,
        author:       author
        };
    Campground.create(newCampground, function(err, newcamp) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/campgrounds");
        }
    });
  });
        
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//Show GET Route
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: camp});
    }
  });
});

//Edit GET Route
router.get("/:id/edit", middleware.checkCampOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        res.render("campgrounds/edit", {campground: camp});
    });
});

// Update POST Route
router.put("/:id", middleware.checkCampOwner, function(req, res) {
  geocoder.geocode(req.body.location, function(err, data) {
    var lat       = data.results[0].geometry.location.lat,
        lng      = data.results[0].geometry.location.lng,
        location  = data.results[0].formatted_address;
    var newData = {
        name:         req.body.name,
        price:        req.body.price,
        image:        req.body.image,
        description:  req.body.desc,
        location:     location,
        lat:          lat,
        lng:          lng
      };
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, UpdatedCamp) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        req.flash("success", "Successfully Updated!");
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
  });
});

//Destroy Route
router.delete("/:id", middleware.checkCampOwner, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.redirect("/campgronds/" + req.params.id);
    } else {
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;