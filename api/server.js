// implement your server here
// require your posts router and connect it here
const express = require('express')
const Post = require('./posts/posts-model')

const server = express()

server.get('/api/posts', (req, res) => {
   Post.find()
   .then(posts => {
        res.json(posts)
   })
   .catch(err => {
    res.status(500).json({
        message: 'The posts information could not be retrieved',
        err: err.message,
        stack: err. stack,
    })
   })
})

server.get('/api/posts/:id', (req, res)=> {
    Post.findById(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        }
        res.json(post)
    })
    .catch(err => {
    res.status(404).json({
        message: 'The posts information could not be retrieved',
        err: err.message,
        stack: err. stack,
    })
   })
    
})
 

module.exports = server; 