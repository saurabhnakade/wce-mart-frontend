import { Box, Skeleton } from "@chakra-ui/react";

function ShimmerProduct() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gap={8}
      alignItems="center"
      mt={10}
    >
      <Box>
        <Skeleton
        mt={100}
        ml={100}
          height="550px"
          width="90%"
          borderRadius="md"
        />
      </Box>

      <Box>
        <Box mb={4} width="fit-content" borderBottom="1px solid #CBD5E0">
          <Skeleton height="44px" width="80%" />
        </Box>
        <Skeleton height="24px" width="90%" mb={4} />
        <Box display="flex" alignItems="center">
          <Skeleton height="44px" width="100px" borderRadius="md" mr={6} />
          <Box>
            <Skeleton height="44px" width="100px" borderRadius="md" />
          </Box>
        </Box>
        <Box>
          <Skeleton height="24px" width="50%" mt={10} mb={6} />
          <Skeleton height="24px" width="50%" mb={6} />
          <Skeleton height="24px" width="50%" mb={6} />
          <Box>
            <Skeleton height="44px" width="120px" borderRadius="md" mb={3} />
            <Skeleton height="44px" width="100%" borderRadius="md" mb={3} />
            <Skeleton height="44px" width="100%" borderRadius="md" mb={3} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ShimmerProduct;
