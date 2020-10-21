const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');

trips = []

app.use(express.urlencoded())


app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")



app.get("/", (req, res) => {
    res.render("index", {allTrips: trips})
})

app.post("/create-trip", (req, res) => {
    let title = req.body.title
    let imageURL = req.body.imageURL
    let departureDate = req.body.departureDate
    let returnDate = req.body.departureDate
    let tripID = uuidv4()

    let trip = {
        tripID: tripID,
        title: title,
        imageURL: imageURL,
        departureDate: departureDate,
        returnDate: returnDate
    }

    trips.push(trip)

    res.redirect("/")
})


app.post("/delete-trip", (req, res) => {
    let tripID = req.body.tripID

    trips = trips.filter(trip => {
        return trip.tripID != tripID
    })
    res.redirect("/")
})

app.post("/editTrip", (req, res) => {
    let tripID = req.body.tripID

    trips = trips.filter(trip => {
        return trip.tripID != tripID
    })
    res.redirect("/")
})


app.listen(3000, () => {
    console.log("the server is running")
})
