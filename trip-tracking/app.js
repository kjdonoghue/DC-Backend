const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');
const tripsRouter = require("./routes/trips") 
const indexRouter = require("./routes/index")
const session = require("express-session")
const path = require("path")
const VIEWS_PATH = path.join(__dirname, "/views")
const bcrypt = require('bcryptjs')
const pgp = require("pg-promise")()
const connectionString = "postgres://localhost:5432/tripsdatabase"
const db = pgp(connectionString)
const authenticate = require('./authenticate')

app.use(express.urlencoded())
app.use("/css", express.static("css"))
app.use("/images", express.static("images"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))


app.use("/trips", authenticate, tripsRouter)
app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"))
app.set("views", VIEWS_PATH)
app.set("view engine", "mustache")
app.use("/", indexRouter)



app.listen(3000, () => {
    console.log("the server is running")
})
