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
    Spinner,
} from "@chakra-ui/react";
import AuthContext from "../context/auth-context";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import url from "../firebase/config";

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
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let imgUrl;
        try {
            setIsLoading(true);
            // Upload images to Firebase Storage
            const storageRef = ref(
                storage,
                `imagesWM/${Date.now().toString()}`
            );
            const metadata = { contentType: product.image.type };
            await uploadBytesResumable(storageRef, product.image, metadata);
            const urlC = await getDownloadURL(storageRef);
            imgUrl = urlC;

            let body = {
                name: product.name,
                description: product.description,
                image: imgUrl,
                price: product.price,
                status: "not sold",
                sellersId: auth.id,
            };

            await fetch(`${url}/api/product/create`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                },
            });
            setIsLoading(false);
            toast({
                title: "Product created",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            history.push("/myproducts");
        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
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
            <form onSubmit={handleSubmit}>
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
                                boxSize="440px"
                                objectFit="contain"
                                maxW="100%"
                                maxH="100%"
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
                        isLoading={isLoading}
                    >
                        {isLoading ? (
                            <Spinner size="sm" color="white" />
                        ) : (
                            "Create Product"
                        )}
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default CreateProduct;
