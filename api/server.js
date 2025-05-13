// implement your server here
// require your posts router and connect it here
const express = require('express')

const server = express()

server.get('/api/users', (req, res) => {
   res.json('users')
})


module.exports = server; 