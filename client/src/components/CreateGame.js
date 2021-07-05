import React,{ useState } from 'react';
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

export const CreateGame = (props)=> {
    const [username,setUsername] = useState("");
    const onChange = (e)=>{
        setUsername(e.target.value);
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        socket.emit('create-game',username);
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
                    Create Game
                </Heading>
                <form onSubmit={onSubmit}>

                    <FormControl isRequired >
                        <FormLabel>Enter Username</ FormLabel>
                        <Input type="text" name =   "username" onChange=  {onChange} value =    {username} placeholder =   "Enter your Username"     className =     "form-control"/>
                        <Button mt={4} fontWeight = "400" type = "submit" >Start Game</   Button>
                    </FormControl>
                </form>
            </Stack>
        </Flex>
    )
}