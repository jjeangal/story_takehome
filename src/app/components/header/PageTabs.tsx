import { Flex, Text, Box } from "@chakra-ui/react";

export default function PageTabs() {
    return (
        <Flex bg="gray.700" borderRadius="2xl" h="80%" w="40%" alignItems="center" justifyContent="center">
            <Flex w="50%" p="2" alignItems="center" justifyContent="center">
                <Text>Upload</Text>
            </Flex>
            <Flex w="50%" p="2" alignItems="center" justifyContent="center">
                <Text>Explore</Text>
            </Flex>
        </Flex>
    );
}