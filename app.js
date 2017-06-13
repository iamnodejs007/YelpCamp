/*jshint esversion: 6*/

const express     = require('express');
const open        = require('open');
const app         = express();
var PORT          = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.get("/", function(req, res) {

  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
   var campgrounds = [
    {name: "Banff campground", image: "http://photosforclass.com/download/5641024448"},
    {name: "Canmore campground", image: "http://photosforclass.com/download/8524305204"},
    {name: "Lake Louise campground", image: "http://photosforclass.com/download/7121861565"}
  ];
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + PORT);
  }
  console.log("Yelp camp Server has started on port: " + PORT);
});