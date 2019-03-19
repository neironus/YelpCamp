const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground')
const Comment = require('../models/comment')
// =======================================================================
//  Comments routes
// =======================================================================


router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
})

router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect('/campgrounds/' + campground._id)  // or + req.params.id
                }
            })
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