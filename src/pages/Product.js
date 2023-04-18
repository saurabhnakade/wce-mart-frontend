import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Grid,
    Image,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import url from "../firebase/config";
import AuthContext from "../context/auth-context";

const Product = () => {
    const id = useParams().id;
    const toast = useToast();
    const auth = useContext(AuthContext);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await fetch(`${url}/api/product/single/${id}`);
                const pObj = await product.json();

                setProduct(pObj);
            } catch (err) {
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
        fetchProduct();
    }, [id, toast]);

    const handleBuy = () => {
        onOpen();
    };

    const confirmBuyHandler = async () => {
        onClose();
        const userId = product.sellersId;
        try {
            const response = await fetch(`${url}/api/user/${userId}`);
            const user = await response.json();

            if (user.message) {
                throw new Error("Error");
            }

            toast({
                title: "Contact",
                description: `${user.name + " → " + user.mobile}`,
                status: "info",
                duration: null,
                isClosable: true,
            });
        } catch (err) {
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
        <Box mt={4} p={40}>
            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                <Box>
                    <Image
                        src={product.image}
                        alt="Product Image"
                        boxSize="550px"
                        objectFit="cover"
                        maxW="100%"
                        maxH="100%"
                    />
                </Box>

                <Box>
                    <Box
                        mb={4}
                        width="fit-content"
                        borderBottom="1px solid #CBD5E0"
                    >
                        <Text fontSize="3xl" fontWeight="bold">
                            {product.name}
                        </Text>
                    </Box>
                    <Text fontSize="lg" color="gray.600" mb={8}>
                        {product.description}
                    </Text>
                    <Box display="flex" alignItems="center">
                        <Box
                            backgroundColor="green.500"
                            color="white"
                            borderRadius="md"
                            padding={2}
                            mr={6}
                        >
                            <Text fontSize="lg" fontWeight="bold" mb={0}>
                                ₹ {product.price}
                            </Text>
                        </Box>
                        <Box>
                            {product.sellersId === auth.id ? (
                                <></>
                            ) : (
                                <Button
                                    fontSize="lg"
                                    colorScheme="yellow"
                                    leftIcon={<FaShoppingCart />}
                                    onClick={handleBuy}
                                    size="md"
                                >
                                    Buy
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Grid>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Purchase</ModalHeader>
                    <ModalBody>
                        Are you sure you want to buy {product.title} for{" "}
                        {product.price}?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            fontSize="lg"
                            colorScheme="green"
                            mr={3}
                            onClick={confirmBuyHandler}
                        >
                            Yes
                        </Button>
                        <Button fontSize="lg" onClick={onClose}>
                            No
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Product;
