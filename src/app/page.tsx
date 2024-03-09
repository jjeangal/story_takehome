import { Flex, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%">
        <Heading>Story Protocol</Heading>
      </Flex>
    </main>
  );
}
