const express = require('express')
const path = require('path')
const app = express();

const http = require("http")
const socketio = require("socket.io")

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket){
  socket.on("send-location",function(data){
    io.emit("recieve-location",{id:socket.id,...data});
  })
  // console.log("User connected");
  socket.on("disconnect",function(){
    io.emit("user-disconnected",socket.id)
  })

  // socket.on("chat message", function(msg){
  //   console.log(msg);
  //   io.emit("chat message",msg);
  // })

  // socket.on("disconnect", function(){
  //   console.log("User disconnected");
  // })
})

app.get("/",function(req,res){
  res.render("index.ejs");
})

server.listen(3000, function(){
  console.log("Server is running on port 3000");
});