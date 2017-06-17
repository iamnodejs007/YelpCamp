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
                req.flash("error", "You dont have permission to do that");
                res.redirect("back");
            }
      }
    });
  } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
  }
};


middlewareObj.checkCampOwner = function (req, res, next) {
  if (req.isAuthenticated()) { //if user is logged in
    Campground.findById(req.params.id, function(err, camp) {
      if (err) {
        console.log(err);
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {
            if (camp.author.id.equals(req.user._id)) { //if user equal to camp user :mongoose method
              next();
            } else {
                req.flash("error", "You dont have permission to do that!");
                res.redirect("back");
            }
      }
    });
  } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
};

module.exports = middlewareObj;