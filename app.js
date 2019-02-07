const express = require("express")
const app = express()
// const bodyParser = require('body-parser')
// const request = require("request")
const port = 3000

// app.use(bodyParser.urlencoded({
//   extended: true
// }))
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("landing")
})

app.get("/campgrounds", (req, res) => {
  const campgrounds = [
    {name: 'Kitty Terwolbeck', image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg"},
    {name: 'Ed Hunsinger', image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg'},
    {name: 'Kelle Cruz', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'}
  ]
  res.render("campgrounds", {campgrounds: campgrounds})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
