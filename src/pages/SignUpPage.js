import { useContext, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";
import url from "../firebase/config";

const SignUpPage = () => {
    const auth = useContext(AuthContext);
    const toast = useToast();
    const history=useHistory();

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        mobile: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const response = await fetch(`${url}/api/user/register`, {
                method: "POST",
                body: JSON.stringify({
                    username: formData.username,
                    name: formData.name,
                    mobile: formData.mobile,
                    password: formData.password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const user = await response.json();
            if (user.message === "User Already Exists") {
                toast({
                    title: "Error",
                    description: "User Already Exists.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else if (user.message) {
                toast({
                    title: "Error",
                    description: "Something Went Wrong",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }

            setIsLoading(false);
            toast({
                title: "Please Verify Your Email",
                status: "info",
                isClosable: true,
            });
            history.push("/login");

        } catch (err) {
            setIsLoading(false);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            marginTop={"70px"}
            borderRadius="lg"
            borderColor={"blackAlpha.200"}
            overflow="hidden"
            p={6}
            maxW="md"
            mx="auto"
            boxShadow={"lg"}
        >
            <Heading as="h1" size="lg" textAlign="center" mb={6}>
                Sign Up
            </Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Username / Email</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            pattern="[a-zA-Z0-9._%+-]+@walchandsangli\.ac\.in$"
                            title="walchandsangli.ac.in"
                            required
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Mobile No.</FormLabel>
                        <Input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="purple"
                        size="lg"
                        fontSize="md"
                        isLoading={isLoading}
                    >
                        {isLoading ? (
                            <Spinner size="sm" color="white" />
                        ) : (
                            "Signup"
                        )}
                    </Button>

                    <Button
                        type="submit"
                        colorScheme="green"
                        size="lg"
                        fontSize="md"
                    >
                        <NavLink to="/">Back to home</NavLink>
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default SignUpPage;
