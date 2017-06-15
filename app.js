/*jshint esversion: 6*/

const express     = require('express'),
      open        = require('open'),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      Campground  = require("./models/campground"),
      seed        = require("./seeds"),
      app         = express(),
      PORT        = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/yelp");

app.set("view engine", "ejs");
app.use(express.static('./public/'));
app.use(bodyParser.urlencoded({extended: true}));

seed();

app.get("/", function(req, res) {

  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({},
    function (err, camps) {
      if (err) {
        console.log(err);
      } else {
  res.render("index", {campgrounds: camps});
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
  res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {

  Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: camp});
    }
  });
});

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + PORT);
  }
  console.log("Yelp camp Server has started on port: " + PORT);
});