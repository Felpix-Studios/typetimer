import React, { useState, useEffect } from "react";
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

const typedCorrectlyStyle = {
	"backgroundColor": "#72b186"
};
const currentStyle = {
    "text-decoration":"underline",
}
const getTypedWords=(words,player)=>{
    let typedWords = words.slice(0,player.currentWordIndex);
    typedWords = typedWords.join(" ");
    return <span style = {typedCorrectlyStyle}>{typedWords} </span>
};
const getCurrentWord = (words,player)=>{
    return <span style = {currentStyle}>{words[player.currentWordIndex]} </span>
}
const getUntypedWords = (words,player)=>{
    let wordsUntyped = words.slice(player.currentWordIndex+1,words.length);
    wordsUntyped = wordsUntyped.join(" ");
    return <span> {wordsUntyped}</span>
}
export const DisplayWords = ({words,player}) => {
	return (
		<Text>
			<>
				{getTypedWords(words, player)}
				{getCurrentWord(words, player)}
				{getUntypedWords(words, player)}
			</>
		</Text>
	);
};
