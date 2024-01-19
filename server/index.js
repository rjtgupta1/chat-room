const express = require('express');
const { Server } = require('socket.io');
const { readFileSync } = require( 'fs');

const app = express();
app.use(express.static(__dirname + '/public'));

const server = app.listen(8080,()=>{
    console.log("Server is up!");
})


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/chatroom.html");
})

app.get('/btn',(req,res)=>{
    console.log("clicked on button");
    res.status(200).json({msg:"Got message at server side."})
})


//  Socket

const io = new Server(server);

io.on('connection',(socket)=>{
    console.log("Connection established");

    socket.on('disconnect',()=>{
        socket.send("User disconnected");
    })

})