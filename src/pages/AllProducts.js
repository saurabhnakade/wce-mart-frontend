import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Image,
    Text,
    Grid,
    Input,
    useToast,
    Center,
    InputLeftElement,
    InputGroup,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";
import url from "../firebase/config";
import { SearchIcon } from "@chakra-ui/icons";
import Shimmer from "../components/Shimmer";

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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${url}/api/product/all`);
                const p = await response.json();
                if (p.message) {
                    throw new Error("Error");
                }
                setProducts(p.filter((pi) => pi.sellersId !== auth.id));
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
        fetchAllProducts();
    }, [auth, toast]);

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
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.600" />
                    </InputLeftElement>
                    <Input
                        mb={4}
                        placeholder="Search products by name..."
                        onChange={handleSearch}
                        value={searchTerm}
                        style={{ width: "400px" }} // Set the width to your desired size
                    />
                </InputGroup>
            </Box>

            {products.length === 0 && !isLoading && (
                <Center mt="31vh">
                    <Box bg="gray.200" p={5} borderRadius="md">
                        {products.length === 0 && <p>No products present</p>}
                    </Box>
                </Center>
            )}

            {isLoading ? (
                <Shimmer/>
            ) : (
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default AllProducts;
