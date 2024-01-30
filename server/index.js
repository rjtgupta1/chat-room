const express = require('express');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('../server/model/model');

const DB = "mongodb://127.0.0.1:27017/chat-room";

const app = express();
app.use(express.static(__dirname + '/public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/pages/signin.html");
})


app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+"/public/pages/signup.html");
})

app.post('/signup', async(req,res)=>{
    let { email,password } = await req.body.data;
    // console.log(email,password);
    res.status(200).json({msg:"Sign-Up Successful"});

    const userData = user({
        email,
        password
    })

    userData.save();

})

app.get('/chatroom',(req,res)=>{
    res.sendFile(__dirname+"/public/pages/chatroom.html");
})

app.post('/signin',async (req,res)=>{
    let { email,password } = await req.body.data;
    // console.log(email,password);

    const userCredential = await user.find({email,password});

    // console.log(userCredential[0].email,userCredential[0].password);
    if(userCredential[0]){
        res.status(200).json({msg:"Login Successful"});
    }else{
        res.status(401).json({msg:"Email or Password is wrong"});
    }

})

//  server

try{
    mongoose.connect(DB);
    console.log("database conneted");
    var server = app.listen(8080,()=>{
        console.log("Server is up!");
    })
}catch(err){
    console.log(err);
}

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