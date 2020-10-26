const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/tripsdatabase";
const db = pgp(connectionString);

router.get("/", (req, res) => {
    res.render("login")
})

router.post("/", (req,res) => {
    const username = req.body.username
    const password = req.body.password

    let verifiedUser = users.find(user => {
        return username == user.username }) 
    
    if (verifiedUser) {
        bcrypt.compare(password, verifiedUser.password, function(err, result) {     
            if (result && req.session) {
                req.session.username = username
                res.redirect("/trips")
            } else {
            res.render("login", {message: "Password is not correct"})
            }
        })
    } else {
        res.render("login", {message: "Username is not correct"})
    }

})



    


module.exports = router