const express = require('express');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/pages/chatroom.html");
})


app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+"/public/pages/signup.html");
})

app.get('/signin',(req,res)=>{
    res.sendFile(__dirname+"/public/pages/signin.html");
})

app.post('/signin',async (req,res)=>{
    let { email,password } = await req.body.data;
    console.log("Email : ",email);
    console.log("Password : ",password);
    res.status(200).json({msg:"Login Successful"});
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