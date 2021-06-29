import { 
    Flex,
    Heading 
} from '@chakra-ui/react'

export const Home = () => {
    return (
        <Flex justifyContent="center" alignItems="top" height="100vh">
            <Heading
            fontSize="8vw"
            bgGradient="linear(to-l, #56CCF2, #2F80ED)"
            bgClip="text"
            padding="2rem"
            >
                Home
            </Heading>
        </Flex>
    )
}