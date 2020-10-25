const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');
const tripsRouter = require("./routes/trips") 
const registrationRouter = require("./routes/registration")
const loginRouter = require("./routes/login")
const loggedoutRouter = require("./routes/loggedout")
const session = require("express-session")
const path = require("path")
const VIEWS_PATH = path.join(__dirname, "/views")
const bcrypt = require('bcryptjs')

global.users = []
global.trips = [{title: "Denver", imageURL: "https://kdvr.com/wp-content/uploads/sites/11/2019/03/gettyimages-1126807921.jpg?w=876&h=493&crop=1",
departureDate: "12/20/2020", returnDate: "12/27/2020"}, {title: "Savannah", imageURL: "https://media.timeout.com/images/105239108/750/422/image.jpg",
departureDate: "03/15/2021", returnDate: "03/28/2021"}]

app.use(express.urlencoded())
app.use("/css", express.static("css"))
app.use("/images", express.static("images"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))


app.use("/registration", registrationRouter)
app.use("/login", loginRouter)
app.use("/trips", authenticate, tripsRouter)
app.use("/loggedout", loggedoutRouter)
app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"))
app.set("views", VIEWS_PATH)
app.set("view engine", "mustache")

function authenticate(req, res, next) {
    if (req.session) {
        if (req.session.username) {
            next()
        } else {
            res.redirect("/login")
        }

    } else {
        res.redirect("/login")
    }

}

app.listen(3000, () => {
    console.log("the server is running")
})
