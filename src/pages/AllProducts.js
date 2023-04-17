import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Image,
    Text,
    Grid,
    // useToast,
    Input,
    useToast,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";

const ProductCard = ({ product }) => {
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
    const auth = useContext(AuthContext);
    const toast = useToast();

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/product/all"
                );
                const p = await response.json();
                setProducts(p.filter((pi) => pi.sellersId != auth.id));
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
        fetchAllProducts();
    }, []);

    const [searchTerm, setSearchTerm] = useState(""); // State to store search term

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
                    <ProductCard key={product.id} product={product} />
                ))}
            </Grid>
        </Box>
    );
};

export default AllProducts;
