const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const { socket } = require("dgram");
{/* <link rel="shortcut icon" href="#"></link>   */}

const app=express();
 const port= 3605 || process.env.PORT ;


const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
});

const server=http.createServer(app);

const io=socketIO(server);
io.on("connection",(socket)=>{
    console.log("New Connection");
    socket.on('joined',({user})=>{
        users[socket.id]=user;
        console.log((`${user} has joined`));
        socket.emit(`welcome`,{user:"Admin",message : `welcome to the chat,${users[socket.id]}`})
        socket.broadcast.emit(`userjoined`,{user:"Admin",message :`${users[socket.id]} has joined`});

    })
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})

    })
    socket.on('disconnect',()=>{
        console.log(`User Left`);
    })
    
});

server.listen(port,()=>{
    console.log('working on http://localhost:${port}');
})

