import { useContext, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";

const SignUpPage = () => {
    const auth = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        mobile: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
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
            const response = await fetch(
                "http://localhost:5000/api/user/register",
                {
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
                }
            );

            const user = await response.json();

            auth.login(user.id, user.token, user.name);
        } catch (err) {
            console.log(err);
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

                    <FormControl isRequired isInvalid={!!formErrors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={!!formErrors.mobile}>
                        <FormLabel>Mobile No.</FormLabel>
                        <Input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{formErrors.mobile}</FormErrorMessage>
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
                    >
                        Sign up
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
