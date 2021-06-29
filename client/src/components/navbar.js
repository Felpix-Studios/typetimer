import { 
    useColorMode,
    Switch,
    Flex,
    Button 
} from '@chakra-ui/react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const color = { light: 'black', dark: 'white' }
    return (
        <Flex>
            <Flex
                position="fixed"
                top="1rem"
                right="1rem"
                color={color[colorMode]}
                align='center'>
                <Flex>
                    <Link to="/"><Button  as="a" variant="ghost" w="100%" my={1}>Home</Button></Link>
                    <Link to="/game"><Button  as="a" variant="ghost" w="100%" my={1} >Game</Button></Link>
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