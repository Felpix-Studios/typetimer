import React from "react";
import { 
    useColorMode,
    Switch,
    Flex,
    Button,
    Box 
} from '@chakra-ui/react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    
} from "react-router-dom";

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const color = { light: 'black', dark: 'white' }
    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    return (
        <Flex>
            <Flex
                position="fixed"
                top="1rem"
                right="1rem"
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
                <Switch
                    ml={4}
                    isChecked={isDark}
                    onChange={toggleColorMode}
                />
            </Flex>
            
        </Flex>
    
    )
}