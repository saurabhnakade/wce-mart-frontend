import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Image,
    Text,
    Grid,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Center,
    Spinner,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import AuthContext from "../context/auth-context";

const ProductCard = ({ product, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteConfirmation = () => {
        setIsDeleting(true);
    };

    const handleDelete = () => {
        onDelete(product.id);
        setIsDeleting(false);
    };

    const handleClose = () => {
        setIsDeleting(false);
    };

    return (
        <Box
            maxW="400px"
            mx="auto"
            mt={8}
            p={4}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            w="100%"
            overflow="hidden"
            textAlign="center"
        >
            <Image
                src={product.image}
                alt={product.name}
                objectFit="cover"
                h="200px"
                w="100%"
                borderRadius="md"
            />
            <Text mt={4} fontSize="xl" fontWeight="bold">
                {product.name}
            </Text>
            <Button
                colorScheme="red"
                size="sm"
                mt={4}
                onClick={handleDeleteConfirmation}
                leftIcon={<FaTrash />}
            >
                Delete
            </Button>

            <Modal isOpen={isDeleting} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Delete</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Text>
                                Are you sure you want to delete this product?
                            </Text>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button variant="ghost" onClick={handleClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

const MyProducts = () => {
    const [products, setProducts] = useState([]); // your initial products data
    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchMyProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:5000/api/product/myproducts/${auth.id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + auth.token,
                        },
                    }
                );
                const p = await response.json();
                setProducts(p.products);
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
        fetchMyProducts();
    }, [auth, toast]);

    const handleDelete = async (productId) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/product/delete/${productId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + auth.token,
                    },
                }
            );
            if (await res.json().message) {
                throw new Error("Error");
            }
            setProducts(products.filter((product) => product.id !== productId));
            toast({
                title: "Product deleted",
                status: "success",
                duration: 3000,
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
        <Box p={4}>
            {isLoading ? (
                <Center h="100vh">
                    <Spinner size="xl" />
                </Center>
            ) : (
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onDelete={handleDelete}
                        />
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MyProducts;
