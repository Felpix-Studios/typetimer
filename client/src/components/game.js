import React,{ useState, setState } from 'react';
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

export const Game = (props)=> {
    
    return (
        <Flex justifyContent="center" alignItems="top" height="100vh" >
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
            </Stack>
        </Flex>
    )
}