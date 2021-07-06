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

const startGameClock = async (gameID)=>{
    let game = await Game.findById(gameID);
    game.startTime = new Date().getTime();
    game = await game.save();
    let time = 10;
    let timerID = setInterval(function gameIntervalFunc(){
        if(time>=0){
            const formattedTime = calculateTime(time);
            io.to(gameID).emit('timer',{countDown:formattedTime,msg: "Time Remaining"});
            time--;
        }else{
            (async ()=>{
                let endTime = new Date().getTime();
                let {startTime} = game;
                game.isOver = true;
                game.players.forEach((players,index)=>{
                    if(player.WPM ===-1){
                        game.players[index].WPM = calculateWPM(endTime,startTime,player);
                    }
                });
                game = await game.save();
                io.to(gameID).emit('updateGame',game);
                clearInterval(timerID); 
            })();
        }
        return gameIntervalFunc;
    },1000);
}

const calculateTime = (time) => {
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const calculateWPM = (endTime, startTime, player) => {
	let numOfWords = player.currentWordIndex;
	const timeInSeconds = (endTime - startTime) / 1000;
	const timeInMinutes = timeInSeconds / 60;
	const WPM = Math.floor(numOfWords / timeInMinutes);
	return WPM;
};

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

    socket.on('timer',async({gameID,playerID})=>{
        let countDown = 5;
        let game = await Game.findById(gameID);
        let player = game.players.id(playerID);
        if(player.isPartyLeader){
            let timerID = setInterval(async()=>{
                if(countDown>=0){
                    io.to(gameID).emit('timer',{countDown,msg:"Starting Game"});
                    countDown--;
                }else{
                    game.isOpen = false;
                    game = await game.save();
                    io.to(gameID).emit('updateGame',game);
                    startGameClock(gameID);
                    clearInterval(timerID);
                }
            },1000);
        }
    });
});

