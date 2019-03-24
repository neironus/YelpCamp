const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')


router.get("/", (req, res) => {
    // console.log(req.user)
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
})


router.post("/", isLoggedIn, (req, res) => {
    const name = req.body.name
    const image = req.body.image
    const description = req.body.description
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = {name: name, image: image, description: description, author: author}
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            console.log("New campground created")
            res.redirect("/campgrounds")
        }
    })
})

router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})


router.get("/:id", (req, res) => {
    Campground.findById(req.params.id)
        .populate("comments")
        .exec( (err, foundCampground) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(foundCampground);/
                res.render("campgrounds/show", {campground: foundCampground})
            }
        })
})

function isLoggedIn(req, res, nex){
    if(req.isAuthenticated()){
        return nex()
    }
    res.redirect("/login")
}

module.exports = router