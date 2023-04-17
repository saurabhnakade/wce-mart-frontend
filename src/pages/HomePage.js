import {
    Box,
    Button,
    Center,
    Image,
    HStack,
    VStack,
    Flex,
    Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function HomePage() {
    return (
        <>
            <Flex
                //   as="nav"
                align="center"
                justify="space-between"
                paddingTop={20}
                //   bg="purple.500"
                color="black"
                justifyContent={"center"}
            >
                <Text
                    fontSize="70"
                    fontWeight="bold"
                    fontFamily={"sans-serif"}
                    textShadow={"md"}
                >
                    WCE MART
                </Text>
            </Flex>
            <Box height="90vh">
                <Center height="100%">
                    <HStack spacing={30} align="center">
                        <Image
                            mb={20}
                            mr={75}
                            borderRadius={70}
                            src="https://www.graphicsprings.com/filestorage/stencils/3055581cff0526602142cbb0bfba9fca.png?width=500&height=500"
                            alt="placeholder"
                            height={750}
                            width={860}
                        />
                        <VStack spacing={35}>
                            <NavLink to="/signup">
                                <Button
                                    type="submit"
                                    colorScheme="purple"
                                    size="lg"
                                    fontSize="2xl"
                                    width={60}
                                    height={20}
                                    borderRadius={20}
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
                                    height={20}
                                    borderRadius={20}
                                >
                                    Login
                                </Button>
                            </NavLink>
                        </VStack>
                    </HStack>
                </Center>
            </Box>
        </>
    );
}

export default HomePage;
