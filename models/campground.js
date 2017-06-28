var mongoose = require('mongoose');

var campgroundsSchema = mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  location: String,
  lat: Number,
  long: Number,
  createdAt: {type: Date, default: Date.now},
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
            }]
});

module.exports =  mongoose.model("Campground", campgroundsSchema);