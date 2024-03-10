import { Flex, Heading } from "@chakra-ui/react";
import Test from "./components/test";

export default function Home() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%">
      <Heading>Story Protocol</Heading>
      <Test />
    </Flex>
  );
}
