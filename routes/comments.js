/*jshint esversion: 6*/

const express     = require('express'),
      router      = express.Router({mergeParams: true}),
      Campground  = require("../models/campground"),
      Comment     = require("../models/comment"),
      middleware  = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: camp});
    }
  });
});


//Post New Comment Route
router.post("/", middleware.isLoggedIn, function(req, res) {
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

//Edit comments GET Route
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
  res.render("comments/edit", {campground_id: req.params.id, comment: comment});
    }
  });
});

//Update comments PUT Route
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


module.exports = router;