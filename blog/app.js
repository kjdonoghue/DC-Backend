const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")
const blogRouter = require("./routes/blog")
const indexRouter = require("./routes/index")
const path = require("path")
const VIEWS_PATH = path.join(__dirname, "/views")
const pgp = require("pg-promise")();
const connectionString = "progres://localhost:5432/blogdatabase";
const db = pgp(connectionString)
const bcrypt = require('bcryptjs')



app.use(express.urlencoded())

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"))
app.set("views", VIEWS_PATH)
app.set("view engine", "mustache")
app.use("/blog", blogRouter)
app.use("/", indexRouter)


app.listen(3000, () => {
    console.log("the server is running")
})