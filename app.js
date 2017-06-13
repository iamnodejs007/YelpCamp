/*jshint esversion: 6*/

const express     = require('express'),
      open        = require('open'),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      app         = express(),
      PORT        = process.env.PORT || 5000;

// var campgrounds   = [
//                       {name: "Banff campground", image: "images/banff.jpg"},
//                       {name: "Canmore campground", image: "images/lake.jpg"},
//                       {name: "Lake Louise campground", image: "images/canmore.jpg"},
//                       {name: "Banff campground", image: "images/banff.jpg"},
//                       {name: "Canmore campground", image: "images/lake.jpg"},
//                       {name: "Lake Louise campground", image: "images/canmore.jpg"},
//                       {name: "Banff campground", image: "images/banff.jpg"},
//                       {name: "Canmore campground", image: "images/lake.jpg"},
//                       {name: "Lake Louise campground", image: "images/canmore.jpg"}
//                     ];

mongoose.connect("mongodb://localhost/yelp");

var campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundsSchema);

// Campground.create(
//   {
//      name: "Banff Campground",
//      image: "images/banff.jpg"
//   }, function(err, camp) {
//     if (err) {
//       console.log("err");
//     } else {
//       console.log("New Camp added: ");
//       console.log(camp);
//     }
//   }

//   );

app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({},
    function (err, camps) {
      if (err) {
        console.log(err);
      } else {
  res.render("campgrounds", {campgrounds: camps});
      }
  });
});

app.post("/campgrounds", function(req, res) {
  var name  = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  Campground.create(newCampground, function(err, newcamp) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("campgrounds");
    }
  });
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