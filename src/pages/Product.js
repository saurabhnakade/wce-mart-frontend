import React, { useEffect, useState } from "react";
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

const Product = () => {
    const id = useParams().id;
    const toast = useToast();

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
                const product = await fetch(
                    `http://localhost:5000/api/product/single/${id}`
                );
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
    }, [id]);

    const handleBuy = () => {
        onOpen();
    };

    const confirmBuyHandler = async () => {
        onClose();
        const userId = product.sellersId;
        try {
            const response = await fetch(
                `http://localhost:5000/api/user/${userId}`
            );
            const user = await response.json();

            toast({
                title: "Contact",
                description: `${user.name + " -> " + user.mobile}`,
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
                    <Image src={product.image} alt="Product Image" />
                </Box>
                <Box>
                    <Text fontSize="2xl" fontWeight="bold" mb={8}>
                        {product.name}
                    </Text>
                    <Text fontSize="lg" color="gray.600" mb={8}>
                        {product.description}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" mb={8}>
                        {product.price}
                    </Text>
                    <Button
                        fontSize="lg"
                        colorScheme="green"
                        leftIcon={<FaShoppingCart />}
                        onClick={handleBuy}
                    >
                        Buy
                    </Button>
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
