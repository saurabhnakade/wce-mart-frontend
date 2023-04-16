import React, { useContext } from "react";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import AuthContext from "../context/auth-context";

const Navbar = () => {
    const auth = useContext(AuthContext);
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            padding={4}
            bg="purple.500"
            color="white"
        >
            <Box>
                <Text fontSize="xl" fontWeight="bold">
                    WCE Mart
                </Text>
            </Box>
            <Box>
                <Stack direction="row" spacing={4}>
                    {auth.isLoggedIn && (
                        <Button disabled colorScheme="purple" size="md">
                            {auth.name}
                        </Button>
                    )}
                    <Button colorScheme="purple" size="md">
                        My Products
                    </Button>
                    <Button colorScheme="purple" size="md">
                        Create Product
                    </Button>
                    <Button
                        colorScheme="purple"
                        size="md"
                        onClick={auth.logout}
                    >
                        Logout
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Navbar;
