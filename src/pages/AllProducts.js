import React, { useState } from "react";
import {
    Box,
    Button,
    Image,
    Text,
    Grid,
    useToast,
    IconButton,
    Input,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const handleClick = () => {};

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
                colorScheme="green"
                size="sm"
                mt={4}
                onClick={handleClick}
                leftIcon={<FaSearch />}
            >
                View
            </Button>
        </Box>
    );
};

const AllProducts = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", image: "https://via.placeholder.com/300" },
        {
            id: 2,
            name: "Product 2",
            image: "https://via.placeholder.com/300",
        },
        {
            id: 3,
            name: "Product 3",
            image: "https://via.placeholder.com/300",
        },
        {
            id: 4,
            name: "Product 4",
            image: "https://via.placeholder.com/300",
        },
        {
            id: 5,
            name: "Product 5",
            image: "https://via.placeholder.com/300",
        },
        {
            id: 6,
            name: "Badminton 6",
            image: "https://via.placeholder.com/300",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState(""); // State to store search term

    const toast = useToast();

    const handleClick = () => {};

    // Function to filter products based on search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase()); // Convert search term to lowercase
    };

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
    );
    return (
        <Box p={4}>
            <Box pl={20} pt={18}>
                <Input
                    mb={4}
                    placeholder="Search products by name..."
                    onChange={handleSearch}
                    value={searchTerm}
                    style={{ width: "400px" }} // Set the width to your desired size
                />
            </Box>

            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={handleClick}
                    />
                ))}
            </Grid>
        </Box>
    );
};

export default AllProducts;
