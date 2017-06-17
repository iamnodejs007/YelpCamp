Campground  = require("../models/campground");
Comment     = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCommentOwner = function (req, res, next) {
  if (req.isAuthenticated()) { //if user is logged in
    Comment.findById(req.params.comment_id, function(err, comment) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
            if (comment.author.id.equals(req.user._id)) { //if user equal to camp user :mongoose method
              next();
            } else {
                res.redirect("back");
            }
      }
    });
  } else {
        res.redirect("back");
  }
};


middlewareObj.checkCampOwner = function (req, res, next) {
  if (req.isAuthenticated()) { //if user is logged in
    Campground.findById(req.params.id, function(err, camp) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
            if (camp.author.id.equals(req.user._id)) { //if user equal to camp user :mongoose method
              next();
            } else {
                res.redirect("back");
            }
      }
    });
  } else {
        res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;