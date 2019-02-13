const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const request = require("request")
const port = 3000

mongoose.connect("mongodb://localhost:32768/yelp_camp", { useNewUrlParser: true })
// mongoose schema
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})
const Campground = mongoose.model("Campground", campgroundSchema)



app.use(bodyParser.urlencoded({ extended: true}))
app.set("view engine", "ejs")
app.use(express.static("public"))



app.get("/", (req, res) => {
  res.render("landing")
})

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render("index", {campgrounds: allCampgrounds})
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
  res.render("new")
})


app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground})
    }
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// var campgrounds = [
//   {name: 'Kitty Terwolbeck', image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg"},
//   {name: 'Ed Hunsinger', image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg'},
//   {name: 'Kelle Cruz', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'}
// ]
