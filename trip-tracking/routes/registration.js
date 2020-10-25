const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')


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



module.exports = router