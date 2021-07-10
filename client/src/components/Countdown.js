import React, { useState, useEffect } from "react";
import socket from "../socketConfig";
import {
	Flex,
	Stack,
    Text,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
} from "@chakra-ui/react";

export const Countdown = (props) => {
    const [timer,setTimer] = useState({countDown:"",msg:""});
    
    useEffect(()=>{
        setTimer({
			countDown: "∞",
			msg: "To get the game going, click the start button below.",
		});
        socket.on('timer',(data)=>{
            setTimer(data);
        });
        socket.on('done',()=>{
            socket.removeListener('timer');
        });
    },[]);
    const {countDown,msg} = timer;

	return (
		<Stack align="center" justify="center">
			<Text fontSize="lg">{countDown}</Text>
			<Text>{msg}</Text>
		</Stack>
	);
};
