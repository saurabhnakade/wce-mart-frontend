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
                    fontFamily={"Heading Font Name"}
                    textShadow={"md"}
                >
                    Wal Mart
                </Text>
            </Flex>
            <Box height="90vh">
                <Center height="100%">
                    <HStack spacing={8} align="center">
                        <Image
                            mb={20}
                            mr={75}
                            borderRadius={70}
                            src="https://www-cdn.bigcommerce.com/assets/_1200x630_crop_center-center_82_none/4914CD_Abandoned-Cart_Thumbnail.jpg?mtime=1661380659"
                            alt="placeholder"
                            height={580}
                            width={960}
                        />
                        <VStack spacing={10}>
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
