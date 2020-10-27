const express = require('express')
const router = express.Router()
const pgp = require("pg-promise")();
const connectionString = "progres://localhost:5432/blogdatabase";
const db = pgp(connectionString)


router.get("/", (req, res) => {
    db.any('SELECT post_id, title, body FROM blog')
    .then (blogs => {
        res.render("blog", {allBlogs: blogs})
    })
})

router.post("/create-post", (req, res) => {
    let title = req.body.title
    let body = req.body.blog_post
    let is_published = "True"

    db.none('INSERT INTO blog(title, body, is_published) VALUES($1, $2, $3)', [title, body, is_published])
    .then(() => {
        res.redirect("/blog")
    })
})

router.post("/delete-post", (req, res) => {
    let post_id = req.body.post_id

    db.none('DELETE FROM blog WHERE post_id = $1', [post_id])
    .then (() => {
        res.redirect("/blog")
    })

})

router.post('/submit-comment', (req, res) => {
    let comment_body = req.body.comment_body
    let post_id = req.body.post_id

    db.none('INSERT INTO comments(comment_body, post_id) VALUES($1, $2)', [comment_body, post_id])
    .then (() => {
        res.redirect('/blog')
    })
})

router.post('/:post_id', async (req, res) => {
    let post_id = req.body.post_id

    let result = await db.any('SELECT blog.post_id, title, body, date_created, comment_body FROM blog JOIN comments ON blog.post_id = comments.post_id WHERE blog.post_id = $1', [post_id])

    let blogListing = getBlogDetails(result)
  
    res.render('details', {blogDetails: blogListing})

})

function getBlogDetails(result) {
    blogListing= []

    result.forEach((item) => {
        if (blogListing.length == 0)  {
            let blogPost = {post_id: item.post_id, title: item.title, body: item.body, comments: [{comment: item.comment_body}]}
            
            blogListing.push(blogPost)
            
        } else {
            let blogPost = blogListing.find(blogPost => blogPost.post_id == item.post_id)
            if (blogPost) {
                blogPost.comments.push({comment: item.comment_body})
                
            } 
        }

    })
    return blogListing
}


module.exports = router