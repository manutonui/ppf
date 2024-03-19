import { useState, useRef, useCallback, useEffect } from "react";

const ChatBox = ({current, author, socket}) => {
    const ref = useRef(null);
    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState([])

    const fetchChats = useCallback(async () => { // when fetched, update unreadCount of recipient
        // console.log('Sending fetch chats request')
        const res = await fetch(`/api/chats/${author}/${current}`)
        const json = await res.json()
        if (res.ok) {
            console.log("Chats Json", json)
            setMsgs(json)
        }
        else { console.log("Error occured fetching chat") }
    }, [current, author])
    

    useEffect(() => {
        fetchChats()
        socket.on('delivermessage', (msgData) => {
            setMsgs(msgs => [...msgs, msgData])
            // setMsgs([...msgs, msgData])
            console.log('[DELIVERY]', msgData)
        })
        ref.current?.scrollIntoView()
    }, [socket, current, fetchChats])

    
    const handleMsg = (e) => setMsg(e.target.value)

    const handleSend = () => {
        if (msg) {
            const msgData = {
                content: msg,
                author, recipient: current
            } 
            socket.emit('sendmessage', msgData)
            setMsgs([...msgs, msgData])
            setMsg('')
            console.log('[LOCAL UPDATE]', msgData)
        }
    }

    const handleEnter = (e) => { if (e.key === 'Enter') handleSend() }


    return (
        <div className="chatwindow">
            <h4 className="highlight chat-head">{current}</h4>
            <div className="chatmsgs">
                {msgs.map( (ms, index) => 
                    (<span key={index} className={`msg`+(ms.author===author ? ' you':'')}>{ms.content}</span>)
                )}
                <span ref={ref}></span>
            </div>
            <div className="input-group msgbox">
                <input onChange={handleMsg} className="form-control" placeholder='Message' value={msg} onKeyUp={handleEnter} />
                <button className="input-group-text" onClick={handleSend}><i className="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    );
}
 
export default ChatBox;