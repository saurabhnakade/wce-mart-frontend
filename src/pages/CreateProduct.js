import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Textarea,
    VStack,
    Image,
    useToast,
} from "@chakra-ui/react";

const CreateProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
    });
    const [imagePreview, setImagePreview] = useState("");
    const toast = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct({ ...product, image: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = () => {
        // Perform form submission logic here
        // e.g. make an API call, dispatch an action, etc.
        // using the product state object
        toast({
            title: "Product created",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box
            marginTop={"70px"}
            borderRadius="lg"
            borderColor={"blackAlpha.200"}
            overflow="hidden"
            p={6}
            maxW="md"
            mx="auto"
            boxShadow={"lg"}
        >
            <Heading as="h1" size="lg" textAlign="center" mb={6}>
                Create a Product
            </Heading>
            <VStack spacing={4}>
                <FormControl isRequired id="name">
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        value={product.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </FormControl>
                <FormControl isRequired id="description">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={product.description}
                        onChange={handleInputChange}
                        name="description"
                    />
                </FormControl>
                <FormControl isRequired id="image" alignItems="center">
                    <FormLabel>Image</FormLabel>
                    <Input
                        type="file"
                        onChange={handleImageChange}
                        name="image"
                    />
                    {imagePreview && (
                        <Image
                            src={imagePreview}
                            alt="Product Image"
                            mt={2}
                            borderRadius="md"
                            boxSize="200px"
                        />
                    )}
                </FormControl>
                <FormControl isRequired id="price">
                    <FormLabel>Price</FormLabel>
                    <Input
                        type="number"
                        value={product.price}
                        onChange={handleInputChange}
                        name="price"
                    />
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="purple"
                    size="lg"
                    fontSize="md"
                    width="sm"
                >
                    Create Product
                </Button>
            </VStack>
        </Box>
        
    );
};

export default CreateProduct;
