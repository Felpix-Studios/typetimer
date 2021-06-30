import { 
    Flex,
    Heading,
    Button,
    Stack 
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';

export const Home = (props) => {
    let history = useHistory();
    return (
        <Flex justifyContent="center" alignItems="top" height="100vh">
            <Stack>
                <Heading
                fontSize="10vw"
                bgGradient="linear(to-l, #56CCF2, #2F80ED)"
                bgClip="text"
                padding="2rem"
                textAlign="center"
                >
                    Home
                </Heading>
                <Flex justify='center' gridGap={6}>
                    <Button fontWeight="400">Create Game</Button>
                    <Button fontWeight="400">Join Game</Button>
                </Flex>
                
            </Stack>
        </Flex>
    )
}