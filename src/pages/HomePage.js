import {
    Box,
    Button,
    Center,
    Image,
    HStack,
    VStack,
    Flex,
    Text,
    Icon,
} from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useLockBodyScroll from "../hooks/no-scroll";

function HomePage() {
    useLockBodyScroll();
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
                <Image
                    src="/logo-wce.webp"
                    alt="WCE Mart logo"
                    boxSize="160px"
                    mr={20}
                />
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
                            src={process.env.PUBLIC_URL + "/cart-logo.png"}
                            alt="placeholder"
                            height={600}
                            width={750}
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
                                    leftIcon={<FaUserPlus />}
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
                                    leftIcon={<Icon as={FaSignInAlt} />}
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
