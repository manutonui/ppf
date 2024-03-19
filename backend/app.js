require('dotenv').config()
const express = require('express')
const app = express()
const server = require("http").createServer(app);
// const cors = require('cors');
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI).then(() => { console.log("[PPF] Mongodb connected") }).catch(e => { console.log("[PPF] MongoDB Error!");console.log(e) })
app.use(express.json({limit: '1024kb'}))
const {Chat, Message} = require('./models/chatSchema')

let allowedOrigins = []
if (process.env.ENV === 'DEV') allowedOrigins = ['http://localhost:3000'];
if (process.env.ENV === 'PROD') allowedOrigins = ['https://kev.litcode.xyz'] // Add your React app's origin here

// app.use(cors());
app.use(( req, res, next) => { // logs all requests
    console.log(req.path, req.method)
    next()
})

// Dictionary to store online users
const onlineUsers = new Map()

const io = require('socket.io')(server, {
    path: '/socket.io',
    cors: {
        origin: allowedOrigins
    }
})

io.on('connection', (socket) => {
    console.log(`Socket [${socket.id}] connected`)
    
    socket.on('join', author => { // Listen for 'join' event when a user joins
        console.log(`${author} [${socket.id}] is online`)
        onlineUsers.set(socket.id, author) // Add the socket to the online users dictionary
        io.emit('updateOnlineUsers', Array.from(onlineUsers.values())); // Notify all clients about the updated online users list
    });

    socket.on('joinchat', async (author, recipient) => {
        let chatFound = await Chat.findOne({users: {$all: [author, recipient]}})
        if (!chatFound) {
            console.log('[New Chat]')
            chatFound = await Chat.create({users: [author, recipient]})
        }
        socket.join(chatFound._id.toString())
        console.log(`[${socket.id} joined chat: ${chatFound._id}]`)
    })

    socket.on('sendmessage', async (data)=>{
        const {author, content, recipient} = data
        let chatFound = await Chat.findOneAndUpdate({users: {$all: [author, recipient]}}, {$inc: {unreadCount: 1}})
        if (!chatFound) {
            // console.log('[SEND] Chat not found')
            chatFound = await Chat.create({users: [author, recipient]})
        }
        if (content) {
            await Message.create({content, author, chat: chatFound._id})
            // console.log("Msg stored")
        }
        // console.log(data)
        socket.to(chatFound._id.toString()).emit('delivermessage', data)
    })

    socket.on('disconnect', () => {
        // Remove the user from the online users dictionary
        onlineUsers.delete(socket.id)
  
        // Notify all clients about the updated online users list
        io.emit('updateOnlineUsers', Array.from(onlineUsers.values()));

        console.log(`User: ${socket.id} disconnected`)
    })
})

const PORT = process.env.PORT || 5000
const usersRoutes = require('./routes/userRoutes')
const locationRoutes = require('./routes/locationRoutes')
const clearanceRoutes = require('./routes/clearanceRoutes')
const criminalRoutes = require('./routes/criminalRoutes')
const wantedRoutes = require('./routes/wantedRoutes')
const incidentRoutes = require('./routes/incidentRoutes')
const psvRoutes = require('./routes/psvRoutes')
const chatRoutes = require('./routes/chatRoutes')
const generalRoutes = require('./routes/generalRoutes')

app.use('/api/users', usersRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/clearances', clearanceRoutes)
app.use('/api/criminals', criminalRoutes)
app.use('/api/wanted', wantedRoutes)
app.use('/api/incidents', incidentRoutes)
app.use('/api/psv', psvRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/stats', generalRoutes)

// middleware to catch non-existing routes e.g render page '404 Not Found'
app.use((req, res, next) => {
    res.status(404).json({error: "[PPF] Route doesn't exist"})
});

server.listen(PORT, ()=>{
    console.log("[PPF] App listening on port: ",PORT)
})