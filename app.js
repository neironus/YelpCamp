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
const commentRouters = require('./routes/comments')
const campgroundRoutes = require('./routes/campgrounds')
const indexRoutes = require('./routes/index')
const seedDB = require('./seeds')
const port = 3000

// seedDB() test content
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

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

app.use("/", indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRouters)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// var campgrounds = [
  // {name: 'Kitty Terwolbeck', image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg"},
  // {name: 'Ed Hunsinger', image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg'},
  // {name: 'Kelle Cruz', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'}
// ]
