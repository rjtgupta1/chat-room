import express from 'express';
import { Server } from 'socket.io';
import { dirname } from 'path';

const app = express();
app.use(express.static('./'))


const server = app.listen(8080,()=>{
    console.log("Server is up!");
})


app.get('/',(req,res)=>{
    res.sendFile(dirname,'index.html');
})


//  Socket

const io = new Server(server);

io.on('connection',(socket)=>{
    console.log("Connection established");
})