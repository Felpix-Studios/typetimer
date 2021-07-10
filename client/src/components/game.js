import React,{ useState, setState } from 'react';
import { Redirect } from 'react-router-dom';
import { Countdown } from './Countdown';
import { StartBtn } from './StartBtn';
import { DisplayWords } from './DisplayWords';
import { TypingBox } from './TypingBox';
import { GameCode } from './GameCode';
import { Scoreboard } from './Scoreboard';
import { ProgressBar } from './ProgressBar';
import socket from '../socketConfig';
import { 
    Flex,
    Stack,
    Heading,
    Container,
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
    const { _id,players,words,isOpen,isOver } = gameState;
    const player = findPlayer(players);
    if(_id === ""){
        return <Redirect to="/"/>
    }
    return (
		<Flex
			justifyContent="center"
			align="center"
			alignItems="top"
			height="100vh"
		>
			<Stack align="center">
				<Heading
					fontSize="8vw"
					bgGradient="linear(to-l, #56CCF2,   #2F80ED)"
					bgClip="text"
					padding="2rem"
					textAlign="center"
				>
					Live Game
				</Heading>
				<Container align="center" m="0 auto" r>
					<Stack justify="center" align="center" spacing={6}>
						<Flex>
							<DisplayWords words={words} player={player} />
						</Flex>
						<ProgressBar
							players={players}
							player={player}
							wordsLength={words.length}
						/>
						<TypingBox
							isOpen={isOpen}
							isOver={isOver}
							gameID={_id}
						/>
						<Countdown />

						<StartBtn as="button" player={player} gameID={_id} />

						<GameCode gameID={_id} gameOpen={isOpen} />
						<Scoreboard players={players} />
					</Stack>
				</Container>
			</Stack>
		</Flex>
	);
}