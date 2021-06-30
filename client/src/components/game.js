import { 
    Flex,
    Heading 
} from '@chakra-ui/react'

export const Game = () => {
    return (
        <Flex justifyContent="center" alignItems="top" height="100vh">
            <Heading
            fontSize="8vw"
            bgGradient="linear(to-l, #56CCF2, #2F80ED)"
            bgClip="text"
            padding="2rem"
            textAlign="center"
            >
                Game
            </Heading>
        </Flex>
    )
}