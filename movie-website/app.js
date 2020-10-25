const express = require('express')
const app = express() 
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');
const session = require("express-session")


const moviesRouter = require('./routes/movies')

global.movies = [{
    movieId: 1,
    title: "Batman", 
    description: "The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.", 
    genre: "superhero", 
    poster: "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_UX182_CR0,0,182,268_AL_.jpg"
},
{
    movieId: 2,
    title: "Batman Returns",
    description: "Batman returns to the big screen when a deformed man calling himself the Penguin wreaks havoc across Gotham with the help of a cruel businessman.",
    genre: "superhero",
    poster: "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_UX182_CR0,0,182,268_AL_.jpg"
},

{
    movieId: 3,
    title: "Willow",
    description: "A young farmer is chosen to undertake a perilous journey in order to protect a special baby from an evil queen.",
    genre: "fantasy",
    poster: "https://m.media-amazon.com/images/M/MV5BZWIyMTA2M2ItOGI5MC00OTY0LWFmZTItN2NkOWQ0MGQ5NDkyL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg" 
}]

app.use(express.urlencoded())

app.use("/css", express.static("css"))
app.use('/movies', moviesRouter)
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')




app.listen(3000,() => {
    console.log('Server is running...')
})