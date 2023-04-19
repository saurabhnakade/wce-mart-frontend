import React, { useContext } from "react";
import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    Icon,
    Image,
    useToast,
} from "@chakra-ui/react";
import AuthContext from "../context/auth-context";
import { NavLink } from "react-router-dom";
import { FaShoppingBag, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { SmallAddIcon, ViewIcon } from "@chakra-ui/icons";

const Navbar = () => {
    const auth = useContext(AuthContext);

    const toast = useToast();

    const clickHandler = () => {
        toast({
            title: `Hello ${auth.name}`,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            padding={4}
            bg="purple.500"
            color="white"
        >
            <NavLink to="/all">
                <Box>
                    <Flex align="center">
                        <Image
                            src="/logo-wce.webp"
                            alt="WCE Mart logo"
                            boxSize="50px"
                            mr={2}
                        />
                        <Text
                            fontFamily="heading"
                            fontSize="4xl"
                            fontWeight="bold"
                            letterSpacing="wide"
                            className="logo-font"
                        >
                            WCE &nbsp;MART
                        </Text>
                    </Flex>
                </Box>
            </NavLink>
            <Box>
                <Stack direction="row" spacing={4}>
                    {auth.isLoggedIn && (
                        <>
                            <Button
                                disabled
                                leftIcon={
                                    <Icon as={FaUserCircle} boxSize={6} />
                                }
                                onClick={clickHandler}
                                colorScheme="purple"
                                backgroundColor="purple.600"
                                size="md"
                            >
                                {auth.name}
                            </Button>
                            <NavLink to="/all">
                                <Button
                                    leftIcon={<FaShoppingBag />}
                                    colorScheme="purple"
                                    size="md"
                                >
                                    All Products
                                </Button>
                            </NavLink>

                            <NavLink to="/myproducts">
                                <Button
                                    leftIcon={
                                        <Icon as={ViewIcon} boxSize={6} />
                                    }
                                    colorScheme="purple"
                                    size="md"
                                >
                                    My Products
                                </Button>
                            </NavLink>
                            <NavLink to="/create">
                                <Button
                                    leftIcon={
                                        <Icon as={SmallAddIcon} boxSize={6} />
                                    }
                                    colorScheme="purple"
                                    size="md"
                                >
                                    Create Product
                                </Button>
                            </NavLink>
                            <Button
                                leftIcon={<FaSignOutAlt />}
                                colorScheme="purple"
                                size="md"
                                onClick={auth.logout}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </Stack>
            </Box>
        </Flex>
    );
};

export default Navbar;
