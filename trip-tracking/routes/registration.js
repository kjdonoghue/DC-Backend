const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/tripsdatabase";
const db = pgp(connectionString);

router.get("/", (req, res) => {
    res.render("registration")
})

router.post("/register", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (username == "" || password == "") {
        res.render("registration", {message: "You must enter a username and password"})
    }

    const dupUser = users.find(user => {
            return username == user.username}) 
    if (dupUser) {
            res.render("registration", {message: "This user name is already taken, please try again"})
        } else {
            bcrypt.genSalt(10, function(err,salt) {
                bcrypt.hash(password, salt, function(err, hash){
                    if (err) {
                        res.render("registration", {message: "There has been an error, please try again"})
                    } else {
                        let newUser = {username: username, password: hash}
                        users.push(newUser) 
                        res.redirect("/login")
                    }
                })
            })
         
        }
})

// router.post("/register", (req, res) => {
//     const username = req.body.username
//     const password = req.body.password

//     if (username == "" || password == "") {
//         res.render("registration", {message: "You must enter a username and password"})
//     }

//     bcrypt.genSalt(10, function(err,salt) {
//         bcrypt.hash(password, salt, function(err, hash){
//             if (err) {
//                 res.render("registration", {message: "There has been an error, please try again"})
//             } else {
//                 db.none("INSERT INTO users(username, hashpassword) VALUES($1, $2)", [username, hash])
//                 .then(() => {
//                     res.redirect("/login")
//                 })                
                
//                 }
//                 })
//             })
         
//         })


module.exports = router