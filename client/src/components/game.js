import React,{ useState, setState } from 'react';
import { Redirect } from 'react-router-dom';
import { Countdown } from './Countdown';
import { StartBtn } from './StartBtn';
import { DisplayWords } from './DisplayWords';
import socket from '../socketConfig';
import { 
    Flex,
    Stack,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
} from '@chakra-ui/react'

const findPlayer = players=>{
    return players.find(player=> player.socketID === socket.id);
}
export const Game = ({gameState})=> {
    console.log(gameState);
    const { _id,players,words } = gameState;
    const player = findPlayer(players);
    if(_id === ""){
        return <Redirect to="/"/>
    }
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
					Live Game
				</Heading>
				<Stack justify="center" align="center">
					<Flex>
						<DisplayWords words={words} player={player} />
					</Flex>
					<Countdown />
					<StartBtn as="button" player={player} gameID={_id} />
				</Stack>
			</Stack>
		</Flex>
	);
}