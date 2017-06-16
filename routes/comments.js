/*jshint esversion: 6*/

const express     = require('express'),
      router      = express.Router({mergeParams: true}),
      Campground  = require("../models/campground"),
      Comment     = require("../models/comment");

router.get("/new", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: camp});
    }
  });
});


//Post New Comment Route
router.post("/", isLoggedIn, function(req, res) {
 Campground.findById(req.params.id, function(err, camp) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id; // refer to commentjs model schema object
          comment.author.username = req.user.username;
          comment.save();
          camp.comments.push(comment);
          camp.save();
      res.redirect("/campgrounds/" + camp._id);
        }
      });
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