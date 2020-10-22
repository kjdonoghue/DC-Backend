const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    res.render("login")
})

router.post("/", (req,res) => {
    const username = req.body.username
    const password = req.body.password

    const verifiedUser = users.find(user => {
        return username == user.username && password == user.password
    })

    if (verifiedUser) {
        if (req.session) {
            req.session.username = username
            res.redirect("/trips")
        } 
    } else {
        res.render("login", {message: "Username or password is incorrect"} )
    }
})

module.exports = router