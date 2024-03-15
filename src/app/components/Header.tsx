import { Flex, Text, Box } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import PageTabs from "./PageTabs";

export default function Header() {
    return (
        <Flex height="8%" width="100%" justifyContent="space-between" alignItems="center">
            <Text flex={1} h="100%" textAlign="left">SWE</Text>
            <Flex flex={1} h="100%" justifyContent="center" alignItems="center">
                <PageTabs />
            </Flex>
            <Box flex={1} display="flex" justifyContent="right">
                <ConnectButton />
            </Box>
        </Flex>
    );
}