import React, { useContext, useState } from "react";
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
import AuthContext from "../context/auth-context";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

const CreateProduct = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

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

    const handleSubmit = async () => {
        let imgUrl;
        try {
            // Upload images to Firebase Storage
            const storageRef = ref(
                storage,
                `imagesWM/${Date.now().toString()}`
            );
            const metadata = { contentType: product.image.type };
            await uploadBytesResumable(storageRef, product.image, metadata);
            const url = await getDownloadURL(storageRef);
            imgUrl = url;

            let body = {
                name: product.name,
                description: product.description,
                image: imgUrl,
                price: product.price,
                status: "not sold",
                sellersId: auth.id,
            };

            await fetch("http://localhost:5000/api/product/create", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                },
            });
            history.push("/myproducts");
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

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
                            objectFit="contain"
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
                    onClick={handleSubmit}
                >
                    Create Product
                </Button>
            </VStack>
        </Box>
    );
};

export default CreateProduct;
