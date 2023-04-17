import { useContext, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    useToast,
} from "@chakra-ui/react";
import AuthContext from "../context/auth-context";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
    const auth = useContext(AuthContext);
    const toast = useToast();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:5000/api/user/login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const user = await response.json();
            setIsLoading(false);

            auth.login(user.id, user.token, user.name);
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
                Log In
            </Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl isRequired isInvalid={!!formErrors.username}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>
                            {formErrors.username}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!formErrors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>
                            {formErrors.password}
                        </FormErrorMessage>
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
                            "Login"
                        )}
                    </Button>

                    <Button
                        type="submit"
                        colorScheme="green"
                        size="lg"
                        fontSize="md"
                    >
                        <NavLink to="/">Back to Home</NavLink>
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default LoginPage;
