/*jshint esversion: 6*/

const express       = require('express'),
      open          = require('open'),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      seed          = require("./seeds"),
      app           = express(),
      PORT          = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/yelp");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

seed();

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


app.get("/", function(req, res) {

  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({},
    function (err, camps) {
      if (err) {
        console.log(err);
      } else {
  res.render("campgrounds/index", {campgrounds: camps});
      }
  });
});

app.post("/campgrounds", function(req, res) {
  var name  = req.body.name;
  var image = req.body.image;
  var desc  = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newcamp) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {

  Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: camp});
    }
  });
});

/*=====COMMENTS ROUTES Start=====*/

app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: camp});
    }
  });
});


//Post New Comment Route
app.post("/campgrounds/:id/comments", function(req, res) {
 Campground.findById(req.params.id, function(err, camp) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          camp.comments.push(comment);
          camp.save();
      res.redirect("/campgrounds/" + camp._id);
        }
      });
    }
  });
});

/*=====COMMENTS ROUTES End=====*/


/*=====AUTH ROUTES Start=====*/

//Register GET Route
app.get("/register", function(req, res) {
  res.render("register");
});

//Register POST Route
app.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.redirect("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});

//Login GET Route
app.get("/login", function(req, res) {
  res.render("login");
});

//Login POST Route
app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {

});

/*=====AUTH ROUTES End=====*/

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + PORT);
  }
  console.log("Yelp camp Server has started on port: " + PORT);
});

