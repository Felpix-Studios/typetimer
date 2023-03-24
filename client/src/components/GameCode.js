import React, { useState, useRef } from "react";
import socket from "../socketConfig";
import {
	Flex,
    useDisclosure,
	Stack,
	Box,
	Text,
	Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightAddon,
    Alert,
    ScaleFade

} from "@chakra-ui/react";
import { CopyIcon, AlertIcon } from "@chakra-ui/icons";



export const GameCode = ({ gameID }) => {
    const [copySuccess,setCopySuccess] = useState(false);
    const textInputRef = useRef(null);
    const copy = (e) => {
		textInputRef.current.select();
        document.execCommand("copy");
        setCopySuccess(true);
        setTimeout(()=>{
            setCopySuccess(false);
        },3000)
	};
    console.log(gameID);
	return (
		<Stack w="75%">
			<InputGroup>
				<Input type="text" ref={textInputRef} value={gameID} readOnly />
				<InputRightAddon
					children={<IconButton icon={<CopyIcon />}  onClick={copy} />}
				/>
			</InputGroup>
			{copySuccess ? (
					<Alert alignText="center" status="success" borderRadius={6}>
						Code Copied!
					</Alert>
			) : null}
		</Stack>
	);
};
