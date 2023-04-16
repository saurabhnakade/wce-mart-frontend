import React, { useEffect, useState } from "react";
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
import { NavLink, useHistory } from "react-router-dom";

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
            <NavLink to={`/product/${product.id}`}>
                <Button
                    colorScheme="green"
                    size="sm"
                    mt={4}
                    onClick={handleClick}
                    leftIcon={<FaSearch />}
                >
                    View
                </Button>
            </NavLink>
        </Box>
    );
};

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/product/all"
                );
                const p = await response.json();
                setProducts(p);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchAllProducts();
    }, []);

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
