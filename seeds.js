var moongoose   = require('mongoose');
var Campground  = require('./models/campground');
var Comment     = require('./models/comment.js');

var data = [
    {
      name: "Banff Campground",
      image: "images/banff.jpg",
      description: "Banff National Park is Canada's oldest national park, established in 1885 in the Rocky Mountains. The park, located 110–180 kilometres (68–112 mi) west of Calgary in the province of Alberta, encompasses 6,641 square kilometres (2,564 sq mi)[2] of mountainous terrain, with numerous glaciers and ice fields, dense coniferous forest, and alpine landscapes. The Icefields Parkway extends from Lake Louise, connecting to Jasper National Park in the north. Provincial forests and Yoho National Park are neighbours to the west, while Kootenay National Park is located to the south and Kananaskis Country to the southeast. The main commercial centre of the park is the town of Banff, in the Bow River valley."
    },
    {
      name: "Jasper Campground",
      image: "images/jasper.jpg",
      description: "Jasper National Park is the largest national park in the Canadian Rockies, spanning 10,878 km2 (4,200 sq mi). It is located in the province of Alberta, north of Banff National Park and west of Edmonton. The park includes the glaciers of the Columbia Icefield, hot springs, lakes, waterfalls and mountains."
    },
    {
      name: "Canmore Campground",
      image: "images/canmore.jpg",
      description: "Canmore is a town in Alberta, Canada, located approximately 81 kilometres (50 mi) west of Calgary near the southeast boundary of Banff National Park. It is located in the Bow Valley within Alberta's Rockies. The town shares a border with Kananaskis Country to the west and south and the Municipal District of Bighorn No. 8 to the north and east. With a population of 12,288 in 2011, Canmore is the ninth-largest town in Alberta."
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
      Campground.create(seed, function(err, campground) {
          if (err) {
           console.log(err);
          } else {
            console.log("Added the campgrounds");
            //Add comments
            Comment.create(
              {
                text: "Best place in the world!",
                author: "khuram"
              }, function(err, comment) {
                if (err) {
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Created new comments");
                }
            });
          }
        });
      });
      }

  });
}

module.exports = seed;