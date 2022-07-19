const express=require("express");
const socket=require("socket.io");

const app=express(); //app initialize and server ready

app.use(express.static("public"));

let port=3000;
let server=app.listen(port,() =>{
    console.log("Listening to port " + port);
})

let io=socket(server);
io.on("connection", (socket) =>{
    console.log("made socket connection");

    //received data
    socket.on("beginPath",(data) =>{
        //data->data from frontend
        //transfer the data to all connected computer
        io.sockets.emit("beginPath",data);
    })

    socket.on("drawStroke",(data) =>{
        io.sockets.emit("drawStroke",data);
    })
    socket.on("redoUndo",(data) => {
        io.sockets.emit("redoUndo",data);
    })
})