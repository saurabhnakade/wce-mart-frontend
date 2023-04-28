import React, { useContext, useEffect, useState } from "react";
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
    useToast,
    Center,
    Spinner,
    Input,
    Flex,
    IconButton,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import url from "../firebase/config";
import AuthContext from "../context/auth-context";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const Product = () => {
    const id = useParams().id;
    const toast = useToast();
    const auth = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBid, setIsLoadingBid] = useState(false);

    const [bid, setBid] = useState("");

    const [allBids, setAllBids] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
    });

    useEffect(() => {
        setIsLoading(true);
        const fetchProduct = async () => {
            try {
                const product = await fetch(`${url}/api/product/single/${id}`);
                const pObj = await product.json();

                const bids = await fetch(`${url}/api/bid/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + auth.token,
                    },
                });
                const bObj = await bids.json();

                setProduct(pObj);
                setAllBids(bObj);
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
        fetchProduct();
    }, [id, toast, auth.token]);

    const handleBuy = () => {
        onOpen();
    };

    const confirmBuyHandler = async () => {
        onClose();
        const userId = product.sellersId;
        try {
            const response = await fetch(`${url}/api/user/${userId}`);
            const user = await response.json();

            if (user.message) {
                throw new Error("Error");
            }

            toast({
                title: "Contact",
                description: `${user.name + " → " + user.mobile}`,
                status: "info",
                duration: 12000,
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

    const handleBidChange = (e) => {
        setBid(e.target.value);
    };

    const handleBid = async () => {
        setIsLoadingBid(true);
        try {
            let body = {
                productsId: id,
                biddersId: auth.id,
                amount: bid,
                name: auth.name,
            };

            await fetch(`${url}/api/bid/create`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + auth.token,
                },
            });
            setIsLoadingBid(false);
            toast({
                title: "Bid Placed Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            setIsLoadingBid(false);
            toast({
                title: "Not able to place Bid",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const bidAcceptRejectHandler = async (id, accept) => {
        try {
            await fetch(`${url}/api/bid/delete/${id}?accept=${accept}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + auth.token,
                },
            });

            const newBids = allBids.bids.filter((b) => b.id !== id);
            const newBObj = { bids: newBids };
            setAllBids(newBObj);

            if (accept) {
                toast({
                    title: "Bid Accepted",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Bid Rejected",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
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
        <>
            {isLoading ? (
                <Center h="100vh">
                    <Spinner size="xl" />
                </Center>
            ) : (
                <Box mt={4} p={40}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                        <Box>
                            <Image
                                src={product.image}
                                alt="Product Image"
                                boxSize="550px"
                                objectFit="contain"
                                maxW="100%"
                                maxH="100%"
                            />
                        </Box>

                        <Box>
                            <Box
                                mb={4}
                                width="fit-content"
                                borderBottom="1px solid #CBD5E0"
                            >
                                <Text fontSize="3xl" fontWeight="bold">
                                    {product.name}
                                </Text>
                            </Box>
                            <Text fontSize="lg" color="gray.600" mb={8}>
                                {product.description}
                            </Text>
                            <Box display="flex" alignItems="center">
                                <Box
                                    backgroundColor="green.500"
                                    color="white"
                                    borderRadius="md"
                                    padding={2}
                                    mr={6}
                                >
                                    <Text
                                        fontSize="lg"
                                        fontWeight="bold"
                                        mb={0}
                                    >
                                        ₹ {product.price}
                                    </Text>
                                </Box>
                                <Box>
                                    {product.sellersId === auth.id ? (
                                        <></>
                                    ) : (
                                        <Button
                                            fontSize="lg"
                                            colorScheme="yellow"
                                            leftIcon={<FaShoppingCart />}
                                            onClick={handleBuy}
                                            size="md"
                                        >
                                            Buy
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                            <Box>
                                <Text
                                    fontSize="lg"
                                    color="gray.600"
                                    mt={10}
                                    mb={6}
                                    fontWeight="bold"
                                >
                                    Year of purchase: {product.yearPurchased}
                                </Text>
                                <Text
                                    fontSize="lg"
                                    color="gray.600"
                                    mb={6}
                                    fontWeight="bold"
                                >
                                    Intermediate users:{" "}
                                    {product.intermediateUsers}
                                </Text>
                                <Text
                                    fontSize="lg"
                                    color="gray.600"
                                    mb={6}
                                    fontWeight="bold"
                                >
                                    Negotiable:{" "}
                                    {product.negotiable ? "Yes" : "No"}
                                </Text>
                                {product.negotiable &&
                                    product.sellersId !== auth.id && (
                                        <Box>
                                            <Box>
                                                <Text
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                    mb={6}
                                                >
                                                    Place a Bid
                                                </Text>
                                                <Flex alignItems="center">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        placeholder="Enter Bid Amount"
                                                        width="200px"
                                                        size="sm"
                                                        mr={8}
                                                        value={bid}
                                                        onChange={
                                                            handleBidChange
                                                        }
                                                    />
                                                    <Button
                                                        colorScheme="green"
                                                        size="sm"
                                                        onClick={handleBid}
                                                    >
                                                        {isLoadingBid ? (
                                                            <Spinner
                                                                size="sm"
                                                                color="white"
                                                            />
                                                        ) : (
                                                            "Submit"
                                                        )}
                                                    </Button>
                                                </Flex>
                                            </Box>
                                        </Box>
                                    )}
                                {product.sellersId === auth.id &&
                                    product.bids &&
                                    allBids.bids.map((bid) => (
                                        <Box
                                            key={bid.id}
                                            pr={4}
                                            pl={4}
                                            pt={1}
                                            pb={1}
                                            mb={3}
                                            borderRadius="md"
                                            bg="gray.100"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Text fontSize="lg">
                                                {bid.name} {" - "}₹ {bid.amount}
                                            </Text>
                                            <Flex>
                                                <IconButton
                                                    aria-label="Accept Bid"
                                                    icon={<CheckIcon />}
                                                    mr={2}
                                                    onClick={() =>
                                                        bidAcceptRejectHandler(
                                                            bid.id,
                                                            true
                                                        )
                                                    }
                                                />
                                                <IconButton
                                                    aria-label="Reject Bid"
                                                    icon={<CloseIcon />}
                                                    onClick={() =>
                                                        bidAcceptRejectHandler(
                                                            bid.id,
                                                            false
                                                        )
                                                    }
                                                />
                                            </Flex>
                                        </Box>
                                    ))}
                            </Box>
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
                                    onClick={confirmBuyHandler}
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
            )}
        </>
    );
};

export default Product;
