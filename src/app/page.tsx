'use client'

import { Flex } from "@chakra-ui/react";
import MintPage from "./components/MintPage";

export default function Home() {

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100%"
    >
      <MintPage />
    </Flex>
  );
}
