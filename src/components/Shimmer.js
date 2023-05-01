import { Box, Grid, Skeleton } from "@chakra-ui/react";

const ProductCardShimmer = () => {
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
      <Skeleton height="200px" borderRadius="md" />
      <Skeleton height="20px" mt={4} mb={2} />
      <Skeleton height="16px" mt={2} />
      <Skeleton height="16px" mt={2} />
      <Skeleton height="32px" mt={4} w="80px" mx="auto" />
    </Box>
  );
};

const Shimmer = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {[...Array(9)].map((_, index) => (
        <ProductCardShimmer key={index} />
      ))}
    </Grid>
  );
};

export default Shimmer
