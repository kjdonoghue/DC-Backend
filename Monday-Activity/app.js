const express = require('express')
const app = express()

app.get("/name", (req, res) => {
    let name = {firstname: "John", lastname: "Doe"}
    res.json(name)
})

app.get("/digital-crafts/cohort/:year", (req, res) => {
    let year = req.params.year
    let message = `I study at DigitalCrafts ${year} cohort`
    res.send(message)
}) 

app.listen(3000, () => {
    console.log("server is running")
})