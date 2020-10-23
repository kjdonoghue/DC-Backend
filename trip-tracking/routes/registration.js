const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    res.render("registration")
})

router.post("/register", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    //need to check if user name exists

    const dupUser = users.find(user => {
        return username == user.username})
        
    if (dupUser) {
            res.render("registration", {message: "This user name is already taken, please try again"})
        } else {
            let newUser = {username: username, password: password}
            users.push(newUser) 
            console.log(users) 
            res.redirect("/login")
        }
})



module.exports = router