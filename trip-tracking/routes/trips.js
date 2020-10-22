const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

router.get("/", (req, res) => {
    res.render("trips", {allTrips: trips})
})

router.post("/create-trip", (req, res) => {
    let title = req.body.title
    let imageURL = req.body.imageURL
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let tripID = uuidv4()

    let trip = {
        tripID: tripID,
        title: title,
        imageURL: imageURL,
        departureDate: departureDate,
        returnDate: returnDate
    }

    trips.push(trip)

    res.redirect("/trips")
})


router.post("/delete-trip", (req, res) => {
    let tripID = req.body.tripID

    trips = trips.filter(trip => {
        return trip.tripID != tripID
    })
    res.redirect("/trips")
})

router.post("/editTrip", (req, res) => {
    let tripID = req.body.tripID

    trips = trips.filter(trip => {
        return trip.tripID != tripID
    })
    res.redirect("/trips")
})

router.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy()
    } else {
        res.redirect("/trips")
    }
    res.redirect("/loggedout")
})


module.exports = router