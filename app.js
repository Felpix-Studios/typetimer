const express = require("express");
const cors = require('cors');
const socketio = require('socket.io');
const path = require('path');
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
let key = require('./secrets.json');
const quote = require('./quote');
app.use(cors());


const server = app.listen(port,()=>{
    console.log(`at port localhost:${port}`);
});
const io = socketio(server,{
    cors:"*"
});

app.get('/',(req,res)=>res.send('This is the server!'))
//model
const Game = require("./models/GameInstance");

//server connection
mongoose.connect(key.key,{useNewUrlParser:true,useUnifiedTopology: true},()=>{console.log("MongoDB Connected");});



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
    socket.on("timer", async ({ gameID, playerID }) => {
        console.log('timer started');
		let countDown = 5;
		let game = await Game.findById(gameID);
		let player = game.players.id(playerID);
		if (player.isPartyLeader) {
			let timerID = setInterval(async () => {
				if (countDown >= 0) {
					io.to(gameID).emit("timer", {
						countDown,
						msg: "Starting Game",
					});
					countDown--;
				} else {
					game.isOpen = false;
					game = await game.save();
					io.to(gameID).emit("updateGame", game);
					startGameClock(gameID);
					clearInterval(timerID);
				}
			}, 1000);
		}
	});
    socket.on('create-game',async (username)=>{
        console.log("game create");
        try{
            let game = new Game();
            const newQuote = await quote();
            game.words = newQuote;
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

    
    socket.on('userInput',async({userInput,gameID})=>{
        console.log('getting user input');
        try{
            let game = await Game.findById(gameID);
            if(!game.isOpen&&!game.isOver){
                let player = game.players.find(player=> player.socketID===socket.id);
                let word = game.words[player.currentWordIndex];
                if(word===userInput){
                    player.currentWordIndex++;
                    if(player.currentWordIndex!==game.words.length){
                        game = await game.save();
                        io.to(gameID).emit('updateGame',game);
                    }else{
                        let endTime = new Date().getTime();
                        let {startTime} = game;
                        player.accuracy = Math.round(((player.currentWordIndex - player.mistakes)/player.currentWordIndex) *100);
                        player.WPM = calculateWPM(endTime,startTime,player);
                        game = await game.save();
                        console.log("sending out done");
                        socket.emit('done');
                        io.to(gameID).emit('updateGame',game);
                    }
                }else{
                    player.currentWordIndex++;
                    player.mistakes++;
                    if (player.currentWordIndex !== game.words.length) {
						game = await game.save();
						io.to(gameID).emit("updateGame", game);
					} else {
						let endTime = new Date().getTime();
						let { startTime } = game;
                        player.accuracy = Math.round(((player.currentWordIndex - player.mistakes)/player.currentWordIndex) *100);
						player.WPM = calculateWPM(endTime, startTime, player);
						game = await game.save();
						console.log("sending out done");
						socket.emit("done");
						io.to(gameID).emit("updateGame", game);
					}
                    
                }
            }
        }catch(err){
            console.log(err);
        }
    });
});

const startGameClock = async (gameID) => {
	let game = await Game.findById(gameID);
	game.startTime = new Date().getTime();
	game = await game.save();
	let time = 180;
	let timerID = setInterval(
		(function gameIntervalFunc() {
			if (time >= 0) {
				const formatTime = calculateTime(time);
				io.to(gameID).emit("timer", {
					countDown: formatTime,
					msg: "Time Remaining",
				});
				time--;
			}
			else {
				(async () => {
					let endTime = new Date().getTime();
					let game = await Game.findById(gameID);
					let { startTime } = game;
					game.isOver = true;
					game.players.forEach((player, index) => {
						if (player.WPM === -1)
							game.players[index].WPM = calculateWPM(
								endTime,
								startTime,
								player
							);
					});
					game = await game.save();
					io.to(gameID).emit("updateGame", game);
					clearInterval(timerID);
				})();
			}
			return gameIntervalFunc;
		})(),
		1000
	);
};