const express = require("express");
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require("mongoose");
const app = express();
const port = 5000;

app.use(cors());


const server = app.listen(port,()=>{
    console.log(`at port localhost:${port}`);
});
const io = socketio(server,{
    cors:"*"
});


//model
const Game = require("./models/GameInstance");

//server connection
mongoose.connect("",{useNewUrlParser:true,useUnifiedTopology: true},()=>{console.log("MongoDB Connected");});

io.on('connect',(socket)=>{
    console.log("connected");
    socket.on('create-game',async (userName)=>{
        console.log("game create");
        try{
            let game = new Game();
            game.words = "Hi, these are test words.";
            let player = {
                socketID : socket.id,
                isPartyLeader : true,
                nickname: userName
            }
            game.players.push(player);
            console.log(game);
            //game =  await game.save();
        
            const gameID = game._id.toString();
            socket.join(gameID);
            io.to(gameID).emit('updateGame',game);
        
            
        }catch(err){
            console.log(err);
        }
    });
});

