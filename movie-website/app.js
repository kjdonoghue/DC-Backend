const express = require('express')
const app = express() 
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');


const moviesRouter = require('./routes/movies')

global.movies = []

app.use(express.urlencoded())

app.use('/movies', moviesRouter)

app.engine('mustache', mustacheExpress())

app.set('views', './views')

app.set('view engine', 'mustache')


app.listen(3000,() => {
    console.log('Server is running...')
})