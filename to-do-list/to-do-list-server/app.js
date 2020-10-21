const express = require("express")
const app = express()
const cors = require("cors")

let toDoList = [{
    title: "Walk dog",
    priority: "High",
    date: "Oct 19"
}, 
{
    title: "Mow lawn",
    priority: "low",
    date: "Oct 19"
}]

app.use(cors())
app.use(express.json())

app.get("/todos", (req, res) => {
    res.json(toDoList)
})

app.post("/todos", (req, res) => {
    let title = req.body.title
    let priority = req.body.priority
    let date = req.body.date

    let task = {title: title, priority: priority, date: date}
    toDoList.push(task)
    res.json({success: true})
})

app.listen(3000, () => {
    console.log("The server is running")
})



