import React from "react";
import  { useState } from 'react';
import { 
    useColorMode,
    Switch,
    Flex,
    Button,
    Box,
    IconButton 
} from '@chakra-ui/react';
import { HamburgerIcon,CloseIcon } from '@chakra-ui/icons';
import {
    BrowserRouter as Router,
    Route,
    Link,
    
} from "react-router-dom";

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const color = { light: 'black', dark: 'white' };
    const bgColor = { light: 'gray.50', dark: 'gray.900' };
    const [display,changeDisplay] = useState('none');

    return (
        <Flex>
            <Flex
                position="fixed"
                top="1rem"
                left="2rem"
                color={color[colorMode]}
                align='center'
            >
                    
                <Flex
                    display={['none','none','flex','flex']}
                    gridGap="1rem"
        
                >
                    <Link to="/"><Button  as="a" variant="ghost" w="100%" my={1} fontWeight="400">Home</Button></Link>
                    <Link to="/game"><Button  as="a" variant="ghost" w="100%" my={1} fontWeight="400">Game</Button></Link>
                </Flex>
                <IconButton
                    aria-label = "Hamburger Icon"
                    size = "md"
                    mr = {2}
                    icon = {<HamburgerIcon/>}
                    display = {['flex','flex','none','none']}
                    onClick = {()=>changeDisplay('flex')}
                />
                <Switch
                    ml={4}
                    position="fixed"
                    top="2rem"
                    right="2rem"
                    isChecked={isDark}
                    onChange={toggleColorMode}
                />
            </Flex>
            <Flex
                w="100vw"
                h="100vh"
                bg={bgColor[colorMode]}
                zIndex={20}
                pos="fixed"
                top="0"
                left="0"
                overflowY="auto"
                flexDir="column"
                display = {display}
            >
                <Flex justify="flex-start">
                    <IconButton
                        mt="1rem"
                        ml="2rem"
                        mb="1rem"
                        aria-label = "X Icon"
                        size = "md"
                        icon = {<CloseIcon/>}
                        onClick = {()=>changeDisplay('none')}
                    />
                </Flex>
                <Flex
                    flexDir = "column"
                    align="center"
                    w="100vw"
                >
                    <Link to="/"><Button  as="a" variant="ghost" w="100vw"  p={24}     fontWeight="400" onClick = {()=>changeDisplay('none')}>Home</Button></Link>
                    <Link to="/game"><Button  as="a" variant="ghost" w="100vw"  p={24}    fontWeight="400" onClick = {()=>changeDisplay('none')}>Game</Button></Link>
                </Flex>
            </Flex>
        </Flex>
    
    )
}