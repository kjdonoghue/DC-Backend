const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/tripsdatabase";
const db = pgp(connectionString);

//registration page
router.get("/registration", (req, res) => {
    res.render("registration")
})

// router.post("/register", (req, res) => {
//     const username = req.body.username
//     const password = req.body.password

    

//     const dupUser = users.find(user => {
//         return username == user.username}) 

//     if (username == "" || password == "") {
//         res.render("registration", {message: "You must enter a username and password"})
//     } else if (dupUser) {
//             res.render("registration", {message: "This user name is already taken, please try again"})
//         } else {
//             bcrypt.genSalt(10, function(err,salt) {
//                 bcrypt.hash(password, salt, function(err, hash){
//                     if (err) {
//                         res.render("registration", {message: "There has been an error, please try again"})
//                     } else {
//                         let newUser = {username: username, password: hash}
//                         users.push(newUser) 
//                         res.redirect("/login")
//                     }
//                 })
//             })
         
//         }
// })

router.post("/register", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let users = await db.any('SELECT username, hashpassword FROM users')

    let dupUser = users.find((user) => {
        return user.username == username
    })
  
    if (username == "" || password == "") {
        res.render("registration", {message: "You must enter a username and password"})
    } else if (dupUser) {
        res.render("registration", {message: "That username is already taken"})
    } else {
        bcrypt.genSalt(10, function(err,salt) {
            bcrypt.hash(password, salt, function(err, hash){
                if (err) {
                    res.render("registration", {message: "There has been an error, please try again"})
                } else {
                    db.none("INSERT INTO users(username, hashpassword) VALUES($1, $2)", [username, hash])
                    .then(() => {
                        res.redirect("/login")
                    })                
                    }
                })
            })
        }
         
})


//login page
router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    let users = await db.any('SELECT username, hashpassword FROM users')

    let verifiedUser = users.find((user) => {
        return user.username == username
    })
    
    if (verifiedUser) {
        bcrypt.compare(password, verifiedUser.hashpassword, function(err, result) {     
            if (err) {
                res.render("login", {message: "An error has occured"})                            
            } 
            else if (result && req.session) {
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


//logged out page
router.get("/loggedout", (req, res) =>{
    res.render("loggedout")
})


module.exports = router