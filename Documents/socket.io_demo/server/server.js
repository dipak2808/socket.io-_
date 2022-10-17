
const { Console } = require('console');
const express = require('express');
const path = require('path');
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(3000, {
    cors: {
        origin: '*',
    }
})
const users = {}
io.on('connection', (socket) => {
    console.log(users[socket.id])
    socket.join('room1')    
    socket.on('new-user-joined', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })
    socket.in('room1').emit('Join-room', `${users[socket.id]} join the room`)   
    socket.on('send message', (message) => {
       socket.broadcast.emit('receive message', { message: message, name: users[socket.id] })
    })
})





