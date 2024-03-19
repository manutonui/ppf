import {io} from 'socket.io-client'
import '../Styles/Chat.css'
import { useState, useEffect, useCallback } from 'react';
import ChatBox from '../Components/ChatBox';

const Chat = ({user}) => {
    const [socket, setSocket] = useState(null);
    const [allusers, setAllUsers] = useState([])
    const [userChats, setUserChats] = useState([])
    const [current, setCurrent] = useState(null)
    // const [onlineUsers, setOnlineUsers] = useState([])
    // const [recipient, setRecipient] = useState("") // user
    // const [showChatBox, setShowChatBox] = useState(false)

    const fetchChats = useCallback(async () => {
        try {
            console.log('Fetching user chats')
            const res = await fetch(`/api/chats/${user.email}`)
            const json = await res.json()
            if (res.ok) setUserChats(json.map(chat => ({...chat, users: chat.users.filter(u => u !== user.email)})))
            console.log('[Chats]', json)
        } catch (e) { console.log(e) }
    },[user.email])

    const fetchUsers = useCallback(async () => {
        try {
            const res = await fetch(`/api/users/fetch`)
            const json = await res.json()
            if (res.ok) setAllUsers(json.filter(u => u.email !== user.email))
            console.log('[Users]',json)
        } catch (e) { console.log(e) }
        
    },[user.email])

    useEffect(()=>{
        let newSocket = null
        console.log(`ENV: ${process.env.REACT_APP_ENV}`)
        if (process.env.REACT_APP_ENV === 'PROD') { newSocket = io('https://kev.litcode.xyz') }
        if (process.env.REACT_APP_ENV === 'DEV') { newSocket = io() }
         // Establish socket connection when the component mounts
        setSocket(newSocket)
        fetchUsers()
        fetchChats()
        return () => newSocket.disconnect()  // Clean up the socket connection when the component unmounts
    },[fetchUsers, fetchChats])

    useEffect(() => {
        if (socket) {
          socket.emit('join', user.email) // Emit the 'join' event when the socket is available
          // socket.on('updateOnlineUsers', updatedOnlineUsers => setOnlineUsers(updatedOnlineUsers)) // Listen for 'updateOnlineUsers' event
        }
    }, [socket, user.email]);

    const selectChat = async (val) => {
        setCurrent(val)
    }

    const listUsers = allusers.map((u,i) => (<option key={i} value={u.email} className={`list-group-item ${current === u.email ? 'selected' : ''}`}>{u.email}</option>))
    const listChats = userChats.map((c,i) => (<li key={i} onClick={() => selectChat(c.users[0])} className={`list-group-item ${current === c.users[0] ? 'selected' : ''}`}>{c.users}</li>))
    
    return (
        <div className="page">
            <div className="page-contents">
                <div className="row chat">
                    <div className="col-12 col-sm-4">
                        <h3 className="highlight">Chat</h3>
                        <div className="contacts">
                            {/* Contains all chats that includes this user */}
                            
                            <select defaultValue="All Contacts" className='form-select' onChange={(e) => selectChat(e.target.value)}><option value='All Contacts' disabled>Select Contact</option>{listUsers}</select>
                            <u className='text-secondary'>inbox</u><br />
                            <ul className='list-group'>{listChats}</ul>
                            {/* <ul className='list-group'><h4>Contacts</h4>{listUsers}</ul> */}
                        </div>
                    </div>
                    <div className="col-12 col-sm-8">
                        <div className="chatbox">
                            {/* Will be blank until a chat is selected */}
                            { current ? <ChatBox current={current} author={user.email} socket={socket} />: <div className="null-chat">Select Chat</div> }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Chat;