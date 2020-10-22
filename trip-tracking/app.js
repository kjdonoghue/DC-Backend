const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');
const tripsRouter = require("./routes/trips") 
const registrationRouter = require("./routes/registration")
const loginRouter = require("./routes/login")
const loggedoutRouter = require("./routes/loggedout")
const session = require("express-session")


global.users = [{username: "demo", password: "demo"}]
global.trips = []

app.use(express.urlencoded())
app.use("/css", express.static("css"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))


app.use("/registration", registrationRouter)
app.use("/login", loginRouter)
app.use("/trips", authenticate, tripsRouter)
app.use("/loggedout", loggedoutRouter)
app.engine("mustache", mustacheExpress())
app.set("views", "./views")
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
