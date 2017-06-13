/*jshint esversion: 6*/

const express     = require('express');
const open        = require('open');
const bodyParser  = require('body-parser');
const app         = express();
const PORT          = process.env.PORT || 5000;
var campgrounds   = [
                      {name: "Banff campground", image: "images/banff.jpg"},
                      {name: "Canmore campground", image: "images/lake.jpg"},
                      {name: "Lake Louise campground", image: "images/canmore.jpg"}
                    ];

app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  res.render("landing");
});

app.get("/campgrounds", function(req, res) {

  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
  var name  = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect("campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + PORT);
  }
  console.log("Yelp camp Server has started on port: " + PORT);
});