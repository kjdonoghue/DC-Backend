const express = require('express');
const router = express.Router(); 
const { v4: uuidv4 } = require('uuid');


router.get("/",(req,res) => {
    res.render('movies', {allMovies: movies})
})

router.post("/create", (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let genre = req.body.genre
    let poster = req.body.poster
    let movieId = uuidv4()

    let movie = {
        movieId: movieId,
        title: title,
        description: description,
        genre: genre,
        poster: poster
    }

    movies.push(movie)

    res.redirect("/movies")
})

router.post("/delete", (req, res) => {
    let movieId = req.body.movieId
    
    movies = movies.filter(movie => {
        return movie.movieId != movieId
    })
    res.redirect("/movies")
}) 

router.post("/:movieId", (req, res) => {
    let movieId = req.params.movieId

    details = movies.filter(movie => {
        return movie.movieId == movieId
    })
    console.log(details)

    res.render("details", {movieDetails: details})
})

router.get("/:genre", (req, res) => {
    let genre = req.params.genre
    
    genreArray = movies.filter(movie => {
        return movie.genre == genre
    })
   
    res.render("genre", {movieGenres: genreArray})
})



module.exports = router 