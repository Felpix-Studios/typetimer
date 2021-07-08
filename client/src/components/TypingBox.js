import React, {useState,useRef,useEffect} from "react";
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
import socket from "../socketConfig";

export const TypingBox = ({isOpen,isOver,gameID}) => {
    const [userInput,setUserInput] = useState("");
    const textInput = useRef(null);

    useEffect(()=>{
        if(!isOpen){
            textInput.current.focus();
        }
    },[isOpen]);
    const resetForm = ()=>{
        setUserInput("");
    }
    const onChange = (e)=>{
        e.preventDefault();
        let value = e.target.value;
        let lastChar = value.charAt(value.length-1);
        if(lastChar===" "){
            socket.emit('userInput',{userInput,gameID});
            resetForm();
        }else{
            setUserInput(e.target.value);
        }
    }
    return(
        <Stack>
            <form>
                <FormControl>
                    <Input type = "text"  readOnly= {isOpen || isOver} onChange = {onChange} value = {userInput} ref = {textInput} preventDefault/>
                </FormControl>
            </form>
        </Stack>
    );
}