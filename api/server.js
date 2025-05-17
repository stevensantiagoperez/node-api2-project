// implement your server here
// require your posts router and connect it here
const express = require('express')
const Post = require('./posts/posts-model')

const server = express()
server.use(express.json( ))

server.put('/api/posts/:id', async (req, res) => {
    try{
        const possiblePost = await Post.findById(req.params.id)
        if(!possiblePost){
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            if(!req.body.title || !req.body.contents) {
                res.status(400).json({
                    message: 'Please provide title and contents for the post'
                })
            } else {
                const updatedCount = await Post.update(req.params.id, req.body);
                if (updatedCount) {
                    const updatedPost = await Post.findById(req.params.id);
                    res.status(200).json(updatedPost);
                } else {
                    res.status(500).json({ message: "Update failed for unknown reasons" });
                }
            }
        } 
    } catch (err) {
        res.status(500).json({
        message: 'The post information could not be modified',
        err: err.message,
        stack: err.stack,
        })
    }
})

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else {
      await Post.remove(req.params.id);
      res.status(200).json(post); // send back the full deleted post
    }
  } catch (err) {
    res.status(500).json({
      message: 'The post could not be removed',
      err: err.message,
      stack: err.stack,
    });
  }
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if(!post.title || !post.contents){
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
    Post.insert(post)
      .then(({ id }) => {
        return Post.findById(id); // get full post by ID
      })
      .then(newPost => {
        res.status(201).json(newPost);
      })
      .catch(err => {
        res.status(500).json({
          message: 'The posts information could not be retrieved',
          err: err.message,
          stack: err.stack,
        });
      });
  }
})

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