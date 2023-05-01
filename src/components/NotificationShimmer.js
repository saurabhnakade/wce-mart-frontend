import { Box ,Skeleton } from "@chakra-ui/react";

const NotificationCardSkeleton = () => {
    return (
        <Box bg="white" p={4} borderRadius="md" mb={4} boxShadow="sm">
            <Skeleton height="30px" w="20%" mb={2} />
            <Skeleton height="16px" w="70%" mb={2} />
            <Skeleton height="16px" w="16%" mb={2} />
        </Box>
    );
};

const NotificationShimmer = () => {
    return (
        <>
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
            <NotificationCardSkeleton />
        </>
    );
};

export default NotificationShimmer;
