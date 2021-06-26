const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose")
const app = express();
const port = 5000;


const server = app.listen(port,()=>{
    console.log(`at port localhost:${port}`);
});
const io = socketio(server);

//model
const Game = require("./models/GameInstance");

//server connection
mongoose.connect("naw lmao",{useNewUrlParser:true,useUnifiedTopology: true},()=>{console.log("MongoDB Connected");});