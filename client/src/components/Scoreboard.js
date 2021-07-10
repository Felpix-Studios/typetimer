import React, { useState, useEffect } from "react";
import socket from "../socketConfig";
import {
	Flex,
	Stack,
	Box,
	Text,
	Heading,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
} from "@chakra-ui/react";

const getScoreboard = (players)=>{
    const scoreboard = players.filter(player=>player.WPM !== -1);
    return scoreboard.sort((a,b)=>a.WPM>b.WPM?-1:b.WPM>a.WPM?1:0);
}
export const Scoreboard = ({players}) => {
    const scoreboard = getScoreboard(players);
    if(scoreboard.length===0){
        return null;
    }
	return (
		<Stack>
			<Heading
				bgGradient="linear(to-l, #56CCF2,   #2F80ED)"
				bgClip="text"
				textAlign="center"
			>
				Scoreboard
			</Heading>
			<Table variant="striped" size="lg" colorScheme="cyan">
				<Thead>
					<Tr>
						<Th>#</Th>
						<Th>Player Username</Th>
						<Th isNumeric>WPM</Th>
						<Th isNumeric>Accuracy</Th>
					</Tr>
				</Thead>
				<Tbody>
					{scoreboard.map((player, index) => {
						return (
							<Tr>
								<Th>{index + 1}</Th>
								<Td>{player.nickname}</Td>
								<Td>{player.WPM}</Td>
								<Td>{player.accuracy}%</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Stack>
	);
};
