let taskTitle = document.getElementById("taskTitle")
let taskPriority = document.getElementById("taskPriority")
let taskDate = document.getElementById("taskDate")
let submitButton = document.getElementById("submitButton")
let toDoList = document.getElementById("toDoListUL")


submitButton.addEventListener("click", () => {
    let title = taskTitle.value
    let priority = taskPriority.value
    let date = taskDate.value

    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            priority: priority,
            date: date
        })
    }).then(response => response.json())
        .then(result => {
            if (result.success) {
                console.log("success")
                populateToDoList()
            }
        })
})

function populateToDoList() {
    toDoList.innerHTML = ""
    fetch("http://localhost:3000/todos")
        .then(response => response.json())
        .then(tasks => {
            let taskItem = tasks.map((task) => {
                return `<li>${task.title} - ${task.priority} - ${task.date} <button>Delete</button></li>`

            })
            toDoList.insertAdjacentHTML("beforeend", taskItem.join(''))
        })
}

populateToDoList()

