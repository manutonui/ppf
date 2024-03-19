const mongoose = require('mongoose')

const {Schema,model} = mongoose

const chatSchema = new Schema({ // chat id == room id
    users: {type: [String], validate: {
      validator: (arr) => arr.length === 2,
      message: 'Array length must be 2.'
    }, required: true},
    unreadCount: {type: Number, required: true, default: 0}
}, {timestamps: true})

const msgSchema = new Schema({
    content: { type: String, required: true },
    author: {type: String, required: true},
    chat: { type: Schema.Types.ObjectId, required: true },
}, {timestamps: true});

const Chat = model('Chat', chatSchema);
const Message = model('Message', msgSchema);

module.exports = {Chat, Message};