import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Center,
    Flex,
    Heading,
    Spinner,
    Text,
    useToast,
} from "@chakra-ui/react";
import url from "../firebase/config";
import AuthContext from "../context/auth-context";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const notificationsPromise = await fetch(
                    `${url}/api/notifications/${auth.id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + auth.token,
                        },
                    }
                );
                const notificationObject = await notificationsPromise.json();
                console.log(notificationObject);
                setNotifications(notificationObject.notifications);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                toast({
                    title: "Error",
                    description:
                        "Something went wrong. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        fetchNotifications();
    }, [auth,toast]);

    return (
        <Box bg="gray.100" minH="100vh">
            <Flex direction="column" p={6} bg="gray.100">
                <Heading as="h1" size="lg" mb={4}>
                    Notifications
                </Heading>

                {notifications.length === 0 && !isLoading && (
                <Center mt="31vh">
                    <Box bg="gray.200" p={5} borderRadius="md">
                        {notifications.length === 0 && <p>No notifications present</p>}
                    </Box>
                </Center>
            )}

                {isLoading ? (
                    <Center h="100vh">
                        <Spinner size="xl" />
                    </Center>
                ) : (
                    <>
                        {notifications.map((notification) => (
                            <Box
                                key={notification.id}
                                bg="white"
                                p={4}
                                borderRadius="md"
                                mb={4}
                                boxShadow="sm"
                            >
                                {/* <Heading as="h2" size="md" mb={2}>{notification.title}</Heading> */}
                                <Text mb={2}>{notification}</Text>
                                {/* <Text color="gray.500">{notification.date}</Text> */}
                            </Box>
                        ))}
                    </>
                )}
            </Flex>
        </Box>
    );
};

export default Notifications;
