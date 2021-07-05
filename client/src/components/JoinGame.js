import React, { useState } from "react";
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

export const JoinGame = (props) => {
	const [userInput, setUserInput] = useState({gameID : "",username : ""});
	const onChange = (e) => {
		setUserInput({...userInput,[e.target.name]:e.target.value});
	};

	const onSubmit = (e) => {
		e.preventDefault();
        console.log(userInput);
		socket.emit("join-game", userInput);
	};
    
	return (
		<Flex justifyContent="center" alignItems="top" height="100vh">
			<Stack>
				<Heading
					fontSize="8vw"
					bgGradient="linear(to-l, #56CCF2,   #2F80ED)"
					bgClip="text"
					padding="2rem"
					textAlign="center"
				>
					Join Game
				</Heading>
                
				<form onSubmit={onSubmit}>
					<FormControl isRequired>
						<FormLabel>Enter Game ID</FormLabel> 
						<Input
							type="text"
							name="gameID"
							onChange={onChange}
							value={userInput.gameID}
							placeholder="Enter a Game ID"
							className="form-control"
						/>
						<FormLabel mt={4}>Enter Username</FormLabel>
						<Input
							type="text"
							name="username"
							onChange={onChange}
							value={userInput.username}
							placeholder="Enter your Username"
							className="form-control"
						/>
						<Button mt={4} fontWeight="400" type="submit">
							Join Game
						</Button>
					</FormControl>
				</form>
			</Stack>
		</Flex>
	);
};
