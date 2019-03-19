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


router.post("/", (req, res) => {
    const name = req.body.name
    const image = req.body.image
    const description = req.body.description
    const newCampground = {name: name, image: image, description: description}
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            console.log("New campground created")
            res.redirect("/campgrounds")
        }
    })
})

router.get("/new", (req, res) => {
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

module.exports = router