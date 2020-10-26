const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const { decodeBase64 } = require('bcryptjs');
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/tripsdatabase";
const db = pgp(connectionString);

router.get("/", (req, res) => {
    db.any('SELECT trip_id, title, image_url, departure_date, return_date FROM trips')
    .then (trips => {
        res.render("trips", {allTrips: trips})
    })
})

router.post("/create-trip", (req, res) => {
    let title = req.body.title
    let image_url = req.body.image_url
    let departure_date = req.body.departure_date
    let return_date = req.body.return_date

    db.none("INSERT INTO trips(title, image_url, departure_date, return_date) VALUES($1, $2, $3, $4)", [title, image_url, departure_date, return_date])
    .then (() => {
        res.redirect("/trips")
    })
})


router.post("/delete-trip", (req, res) => {
    let trip_id = req.body.trip_id

    db.none("DELETE FROM trips WHERE trip_id = $1", [trip_id])
    .then (() => {
        res.redirect("/trips")
    })
    
})

router.post("/edit-trip", (req, res) => {
    let trip_id = req.body.trip_id
    let departure_date = req.body.departure_date

    db.none("UPDATE trips SET departure_date = $1 WHERE trip_id = $2", [departure_date, trip_id])
    .then (() => {
        res.redirect("/trips")
    })
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