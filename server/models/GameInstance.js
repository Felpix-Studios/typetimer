const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    currentWordIndex:{
        type:Number,
        default:0
    },
    socketID:{
        type:String
    },
    isPartyLeader:{
        type:Boolean,
        default:false
    },
    mistakes:{
        type: Number,
        default:0
    },
    accuracy:{
        type: Number,
        default:100
    },
    WPM:{
        type:Number,
        default:-1
    },
    nickname:{
        type:String
    }
});

const GameSchema = new mongoose.Schema({
    words:[{type:String}],
    isOpen:{
        type:Boolean,
        default:true
    },
    isOver:{
        type:Boolean,
        default:false
    },
    players:[PlayerSchema],
    startTime:{
        type:Number
    }
});

module.exports = mongoose.model('GameInstance',GameSchema);