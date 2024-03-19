const {Chat, Message} = require('../models/chatSchema')

const fetchChats = async (req, res) => {
    try {
        const {user1, user2} = req.params
        // Note user 1 will always be author
        const chatFound = await Chat.findOne({users: {$all: [user1, user2]}})
        // check if in last message, user is author
        // const latestMsg = await Message.find({ chat: chatFound._id }).sort({$natural: -1})
        if (!chatFound) {
            res.status(200).json([])
        } else {
            const msgs = await Message.find({ chat: chatFound._id })
            res.status(200).json(msgs)
        }
    } catch (e) {
        console.log("Error fetching chats!",e)
    }
}

const fetchUserChats = async (req, res) => {
    try {
        
        const {user} = req.params
        const chatsFound = await Chat.find({users: {$in: [user]}})
        console.log('Chats found...', chatsFound)
        if (!chatsFound.length) {
            res.status(200).json([])
        } else {
            // const msgs = await Message.find({ chat: chatFound._id })
            // fetchLastMessage
            res.status(200).json(chatsFound)
        }
    } catch (e) {
        console.log("Error fetching chats!", e)
    }
}

module.exports = { fetchChats, fetchUserChats }