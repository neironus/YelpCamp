const mongoose = require('mongoose')
const Campground = require('./models/campground')
const Comment = require('./models/comment')

const data = [{
    name: "Clouds Rest",
    image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  {
    name: "Desert Camp",
    image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  {
    name: "Canyon Floor",
    image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  {
    name: 'Kitty Terwolbeck',
    image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  {
    name: 'Ed Hunsinger',
    image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },

  {
    name: 'Kelle Cruz',
    image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

const seedDB = () => {
  //remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Removed Campgrounds.");

    //Add a few campgrounds
    //inside the remove function because if it's outside, Javascript is asynchronus
    //and doesn't guarantee what order code will be run
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a campground!");
          //Create a comment
          Comment.create({
            text: "This place is great, but I wish there was internet...",
            author: "Homer"
          }, (err, comment) => {
            if (err) {
              console.log(err);
            } else {
              //associate comment with a campground in "data"
              campground.comments.push(comment);
              campground.save();
              console.log("Created a new comment");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
