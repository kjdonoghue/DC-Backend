const express = require('express')
const router = express.Router()
const models = require('../models')
// const { Op } = require("sequelize")


router.get('/', (req, res) => {
    models.Blog.findAll()
    .then(blogs => {
        res.render("seqblog", {allBlogs: blogs})
    })

}) 

router.post('/create-post', (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category
    let published = true

    let post = models.Blog.build({
        title: title,
        body: body,
        category: category,
        is_published: published,
    })
    post.save().then((savedBlog) => {
        res.redirect('/seqblog')
    })
    
})

router.post('/delete-post', (req, res) => {
    const post_id = req.body.post_id

    models.Blog.destroy({
        where: {
            id: post_id
        }
    }).then(deletedBlog =>
        res.redirect('/seqblog'))

})

router.post('/search', (req, res) => {
    const selectedCategory = req.body.category

    models.Blog.findAll({
        where: {
            category: selectedCategory
        }
    }).then(blogs => {
        res.render("seqblog", {allBlogs: blogs})
    })

})

router.post('/add-comment', (req, res) => {
    let post_id = req.body.post_id
    let comment_title = req.body.comment_title
    let comment_body = req.body.comment_body
    console.log(comment_body)

    let comment = models.comment.build({
        title: comment_title,
        body: comment_body,
        post_id: post_id
    })

    comment.save().then(savedComment => {
        res.redirect('/seqblog')
    })

})

router.post('/:post_id', (req, res) => {
   let post_id = req.body.post_id
    console.log(req.body.post_id)

    models.Blog.findByPk(post_id).then(blog => {
        console.log(blog)
        res.render("update", {updateBlogs: blog})
    })

})

router.post('/edit-post', (req, res) => {
    const post_id = req.body.post_id
    const title = req.body.title
    const category = req.body.category
    const body = req.body.body
    

    models.Blog.update({
        title: title,
        category: category,
        body: body 
    }, {
        where: {
            id: post_id
        }
    }).then(updatedBlog => {
        res.redirect('/seqblog')
    })
   

})


module.exports = router