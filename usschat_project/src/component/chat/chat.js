import React, { useEffect, useState } from 'react';
import { user } from '../Join/Join'; // Import user as a named import
import socketIO from "socket.io-client";
import "./chat.css";
import pic from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeicon from "../../images/closeicon.png";
const ENDPOINT = "http://localhost:3605/";
let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const[messages,setMessages] = useState([])

  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
  }
 console.log(messages);
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ['websocket'] });
    socket.on('connect', () => {
      alert("connected");
      socket.emit('joined', { user }); // Emit joined event after connection
      setId(socket.id);
    });

    socket.on(`welcome`, (data) => {
      setMessages([...messages,data]);
      console.log(data.user, data.message);
    });
    socket.on(`userjoined`, (data) => {
      setMessages([...messages,data]);
      console.log(data.user, data.message);
    });

    return () => {
      // socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages,data]);
      console.log(data.user, data.message, data.id);
    })
    return () => {
     socket.off();
    }
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2> USS CHAT</h2>
         <a href="/"> <img src={closeicon} alt="close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item,i)=> <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event)=>event.key==='Enter' ? send() : null} type="text" id="chatInput" />
          <button onClick={send} className="sendBtn"><img src={pic} alt="Send" /></button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
