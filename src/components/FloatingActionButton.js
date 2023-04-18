import { SmallAddIcon } from "@chakra-ui/icons";
import { IconButton, Flex, Icon } from "@chakra-ui/react";

function FloatingActionButton() {
    return (
        <Flex position="fixed" bottom="50px" right="50px" justify="flex-end">
            <IconButton
                borderRadius="full"
                fontSize="2xl"
                aria-label="Add product"
                icon={<Icon as={SmallAddIcon} boxSize={8} color="white" />}
                size="lg"
                width="60px"
                height="60px"
                bg="purple.500"
                _hover={{
                    bg: "purple.500",
                    transform: "scale(1.2)",
                }}
                _focus={{ outline: "none" }}
                transition="all 0.2s ease-out"
            />
        </Flex>
    );
}

export default FloatingActionButton;
