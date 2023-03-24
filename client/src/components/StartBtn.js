import React, { useState, setState } from "react";
import { Redirect } from "react-router-dom";
import socket from "../socketConfig";
import {
	Flex,
	Stack,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
} from "@chakra-ui/react";


export const StartBtn = ({player, gameID}) => {
    const [showBtn, setShowBtn ] = useState(true);
    const { isPartyLeader } = player;
	const startMessage=e=>{
        socket.emit('timer',{playerID:player._id,gameID});
        setShowBtn(false);
    };
    return (
		isPartyLeader && showBtn ? <Button fontWeight="400" type="button" onClick={startMessage}>Start</Button> : null
	);
};
