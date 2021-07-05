import React, { useState, setState } from "react";
import { Redirect } from "react-router-dom";
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
    console.log(props);
	return (
		<Flex>
			<Text>this is a countdown</Text>
		</Flex>
	);
};
