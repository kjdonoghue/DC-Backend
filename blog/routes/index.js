const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const pgp = require("pg-promise")();
const connectionString = "progres://localhost:5432/blogdatabase";
const db = pgp(connectionString)



// registration page
router.get('/registration', (req, res) => {
    res.render('registration')
})

router.post('/create-account', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
     
    let users = await db.any('SELECT username, password FROM users')
    
    let dupUser = users.find((user) => {
        return user.username == username
    })

    if (username == "" || password == "") {
        res.render("registration", {message: "You must enter a username and password"})
    }
    else if (dupUser) {
        res.render("registration", {message: "That username is already taken"})
        
    } else {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                db.none('INSERT INTO users (username, password) VALUES($1, $2)', [username, hash])
                .then (() => {
                    res.redirect('login')
                })
            })
        })
    }

})


// Login Page

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/verify-account', async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    let users = await db.any('SELECT username, password FROM users')

    let verifiedUser = users.find((user) => {
        return user.username == username
    })
   

    if (verifiedUser) {
        console.log("verified")
        bcrypt.compare(password, verifiedUser.password, function(err, result) {
            if (result) {
                res.redirect('/blog')
            } else {
            res.render("login", {message: "Password is not correct"})
            }
        })
    } else {
        res.render("login", {message: "Username is not correct"})
       
    }


})


module.exports = router
