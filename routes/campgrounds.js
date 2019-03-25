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

// Edit form
router.get("/:id/edit", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err){
            res.redirect("/campgrounds")
        } else {
            res.render("campgrounds/edit", {campground: foundCampground})
        }
    })
})

// Update campground route
router.put("/:id", (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    } )
} )

router.delete("/:id", (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err) => {
        if (err){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/")
        }
    } )
} )



function isLoggedIn(req, res, nex){
    if(req.isAuthenticated()){
        return nex()
    }
    res.redirect("/login")
}

module.exports = router