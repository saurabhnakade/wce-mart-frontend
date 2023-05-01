import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Center,
    Flex,
    Heading,
    Icon,
    Text,
    useToast,
} from "@chakra-ui/react";
import url from "../firebase/config";
import AuthContext from "../context/auth-context";
import { MdClose } from "react-icons/md";
import NotificationShimmer from "../components/NotificationShimmer";

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

    const handleDelete=async (index)=>{
        const newNot=[...notifications];
        newNot.splice(index,1)
        setNotifications(newNot);

        try{
            await fetch(`${url}/api/notifications/${index}`,{
                method:"DELETE",
                body:JSON.stringify({
                    id:auth.id
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                },

            })

        }catch(err){

        }
    }

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
                    <NotificationShimmer/>
                ) : (
                    <>
                        {notifications.map((notification,index) => {
                            const words = notification.split(" ");
                            let heading="Enquiry";
                            let styles={color:"magenta"};

                            let string = words.slice(0, words.length-4).join(" ");
                            let time=words.slice(words.length-3,words.length).join(" ");

                            if(notification.includes("accepted")){
                                heading="Accepted";
                                styles={color:"green"};
                            }else if(notification.includes("rejected")){
                                heading="Rejected"
                                styles={color:"red"};
                            }else if(notification.includes("received")){
                                heading="Received"
                                styles={color:"blue"};
                            }

                            return(
                                <Box
                                    key={(index*200)+27}
                                    bg="white"
                                    p={4}
                                    borderRadius="md"
                                    mb={4}
                                    boxShadow="sm"
                                    position="relative"
                                >
                                    <Icon
                                        as={MdClose}
                                        position="absolute"
                                        top={3}
                                        right={3}
                                        cursor="pointer"
                                        onClick={()=>handleDelete(index)}
                                    />
                                    <Heading style={styles} as="h2" size="md" mb={2}>{heading}</Heading>
                                    <Text mb={2}>{string}</Text>
                                    <Text color="gray.500">{time}</Text>
                                </Box>
                        )})}
                    </>
                )}
            </Flex>
        </Box>
    );
};

export default Notifications;
