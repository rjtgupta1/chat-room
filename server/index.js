const express = require('express');
const { Server } = require('socket.io');

const app = express();
app.use(express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/chatroom.html");
})


//  server

const server = app.listen(8080,()=>{
    console.log("Server is up!");
})

//  Socket

const io = new Server(server);

io.on('connection',(socket)=>{
    console.log("Connection established");

    socket.on('disconnect',()=>{
        socket.send("User disconnected");
    })

    socket.on('error',()=>{
        console.log("Something went wrong");
    })

    socket.on('message',(msg)=>{
        // console.log("message : ",msg);
        socket.broadcast.emit('message',msg);
    })

})