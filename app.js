/*jshint esversion: 6*/

const express     = require('express');
const open        = require('open');
const app         = express();
var PORT          = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.static('./public'));

app.get("/", function(req, res) {

  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
   var campgrounds = [
    {name: "Banff campground", image: "images/banff.jpg"},
    {name: "Canmore campground", image: "images/lake.jpg"},
    {name: "Lake Louise campground", image: "images/canmore.jpg"}
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