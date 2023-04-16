import { Box, Button, Center, Image, HStack, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function HomePage() {
    return (
        <Box height="100vh">
            <Center height="100%">
                <HStack spacing={8} align="center">
                    <Image
                        mr={30}
                        borderRadius={40}
                        src="https://via.placeholder.com/1000x500"
                        alt="placeholder"
                        maxW="100%"
                        h="auto"
                    />
                    <VStack spacing={6}>
                        <NavLink to="/signup">
                            <Button
                                type="submit"
                                colorScheme="purple"
                                size="lg"
                                fontSize="2xl"
                                width={60}
                                height={14}
                            >
                                Sign up
                            </Button>
                        </NavLink>
                        <NavLink to="/login">
                            <Button
                                type="submit"
                                colorScheme="green"
                                size="lg"
                                fontSize="2xl"
                                width={60}
                                height={14}
                            >
                                Login
                            </Button>
                        </NavLink>
                    </VStack>
                </HStack>
            </Center>
        </Box>
    );
}

export default HomePage;
