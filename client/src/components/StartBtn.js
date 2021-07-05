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


export const StartBtn = (props) => {
	return (
		<Flex>
			<Button fontWeight="400">start</Button>
		</Flex>
	);
};
