import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const Product = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [product, setProduct] = useState({
        title: "Product Title",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        price: "$9.99",
        image: "https://cdn.shopify.com/s/files/1/0567/8048/8865/products/3-01_540x.jpg?v=1624370401",
    });

    const handleBuy = () => {
        onOpen();
    };

    return (
        <Box mt={4} p={40}>
            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                <Box>
                    <Image src={product.image} alt="Product Image" />
                </Box>
                <Box>
                    <Text fontSize="2xl" fontWeight="bold" mb={8}>
                        {product.title}
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
                            onClick={onClose}
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
