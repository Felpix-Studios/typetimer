import React, { useState, useEffect } from "react";
import socket from "../socketConfig";
import {
	Flex,
	Stack,
    Box,
	Text,
	Heading,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
    Progress,
	Button,
} from "@chakra-ui/react";

const calculatePercentage = (player, wordsLength) => {
	if (player.currentWordIndex !== 0) {
		return ((player.currentWordIndex / wordsLength) * 100).toFixed(2);
	}
	return 0;
};

export const ProgressBar = ({players,player,wordsLength}) => {
    const percentage = calculatePercentage(player,wordsLength);
    const transitionEffect = {
        transition: '400ms cubic-bezier(0.26, 0.8, 0.29, 0.98)'
    }
	return (
		<Box justify="center" w="100%">
			{
				<>
					<Heading align="left" as="h3" size="lg" mb={2}>
						{player.nickname}
					</Heading>
					<Box key={player._id} align="left" mb={4}>
						<Progress
							colorScheme="cyan"
							hasStripe
							value={percentage}
                            borderRadius={6}
						/>
					</Box>
				</>
			}
			{players.map((playerObj) => {
				const percentage = calculatePercentage(playerObj, wordsLength);
				return playerObj._id !== player._id ? (
					<>
						<Heading align="left" as="h4" size="md" mb={2}>
							{playerObj.nickname}
						</Heading>
						<Box key={playerObj._id} align="left" mb={4}>
							<Progress
								colorScheme="cyan"
								hasStripe
								value={percentage}
								style={transitionEffect}
							/>
						</Box>
					</>
				) : null;
			})}
		</Box>
	);
};
