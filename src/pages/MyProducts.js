import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

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
              <Text>Are you sure you want to delete this product?</Text>
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
            name: "Product 6",
            image: "https://via.placeholder.com/300",
        },
        {
            id: 1,
            name: "Product 1",
            image: "https://via.placeholder.com/300",
        },
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
            name: "Product 6",
            image: "https://via.placeholder.com/300",
        },
    ]); // your initial products data

    const toast = useToast();

    const handleDelete = (productId) => {
        setProducts(products.filter((product) => product.id !== productId));
        toast({
            title: "Product deleted",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box p={4}>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onDelete={handleDelete}
                    />
                ))}
            </Grid>
        </Box>
    );
};

export default MyProducts;
