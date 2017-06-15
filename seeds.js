var moongoose = require('mongoose');
var Campground = require('./models/campground');

var data = [
    {
      name: "Banff Campground",
      image: "images/banff.jpg",
      description: "Beautiful landscape with breathtaking views and a beautiful lake"
    },
    {
      name: "Jasper Campground",
      image: "images/jasper.jpg",
      description: "Must visit the skywalk with breathtaking views"
    },
    {
      name: "Canmore Campground",
      image: "images/canmore.jpg",
      description: "Must visit the skywalk with breathtaking views"
    }
  ];
function seed() {
  //Remove all campgrounds
  Campground.remove({}, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("removed campgrounds!");

        //Add campgrounds
         data.forEach(function(seed) {
      Campground.create(seed, function(err) {
          if (err) {
           console.log(err);
          } else {
            console.log("Added the campgrounds");
          }
        });
      });
      }

  });



  //Add comments
}

module.exports = seed;