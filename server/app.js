const express = require("express");
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require("mongoose");
const app = express();
const port = 5000;
let key = require('./secrets.json');

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
mongoose.connect(key.key,{useNewUrlParser:true,useUnifiedTopology: true},()=>{console.log("MongoDB Connected");});

io.on('connect',(socket)=>{
    console.log("socket.io connected");
    socket.on('create-game',async (username)=>{
        console.log("game create");
        try{
            let game = new Game();
            game.words = "Hi, these are test words.";
            let player = {
                socketID : socket.id,
                isPartyLeader : true,
                nickname: username
            }
            game.players.push(player);
            game =  await game.save();
        
            const gameID = game._id.toString();
            socket.join(gameID);
            io.to(gameID).emit('updateGame',game);
        
            
        }catch(err){
            console.log(err);
        }
    });
    socket.on('join-game',async ({gameID:_id,username})=>{
        console.log("game join");
        try{
            let game = await Game.findById(_id);
            if(game.isOpen){
                const gameID = game._id.toString();
                socket.join(gameID);
                let player = {
                    socketID : socket.id,
                    nickname: username
                }
                game.players.push(player);
                game = await game.save();
                io.to(gameID).emit('updateGame',game);
            }
        }catch(err){
            console.log(err);
        }
    });
});

