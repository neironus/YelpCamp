const express = require("express")
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const Comment = require('./models/comment')
const Campground = require('./models/campground')
const seedDB = require('./seeds')
const port = 3000

seedDB()
mongoose.connect("mongodb://localhost:32768/yelp_camp", { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

//PASSPORT ==========
app.use(session({
    secret: 'sSUPer caT',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ==================

app.get("/", (req, res) => {
  res.render("landing")
})

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds})
    }
  })
})


app.post("/campgrounds", (req, res) => {
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

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new")
})


app.get("/campgrounds/:id", (req, res) => {
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

// =======================================================================
//  Comments routes
// =======================================================================


app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground})
    }
  })
})

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
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

// ======  Auth Routs  ==============


app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, ()=> {
            res.redirect("/campgrounds")
        })

    })
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }
    ),(req, res) => {

})

app.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/campgrounds")
})

// ======  Auth Routs END ==============

function isLoggedIn(req, res, nex){
    if(req.isAuthenticated()){
        return nex()
    }
    res.redirect("/login")
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// var campgrounds = [
  // {name: 'Kitty Terwolbeck', image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg"},
  // {name: 'Ed Hunsinger', image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg'},
  // {name: 'Kelle Cruz', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'}
// ]
