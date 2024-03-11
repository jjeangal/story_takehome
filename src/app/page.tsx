import { Flex, Heading } from "@chakra-ui/react";
import Test from "./components/test";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%">
      <Heading>Story Protocol</Heading>
      <ConnectButton />
      <Test />
    </Flex>
  );
}
