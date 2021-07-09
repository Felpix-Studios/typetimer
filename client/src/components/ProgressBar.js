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
    console.log(percentage);
	return (
		<Box justify="center" w="100%">
			{
				<>
					<Heading align="left" as="h3" size="lg">
						{player.nickname}
					</Heading>
					<Box key={player._id} align="left">
						<Progress
							colorScheme="cyan"
							hasStripe
							value={percentage}
						/>
					</Box>
				</>
			}
		</Box>
	);
};
