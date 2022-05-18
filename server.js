const express = require('express')
const app = express ()
const http = require ("http")
const server = http.createServer(app)

const port = process.env.PORT || 8080

const {Server} = require("socket.io")
const io = new Server(server)



server.listen(port, () =>{
    console.log("server running on")
})