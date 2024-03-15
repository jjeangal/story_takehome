'use client'

import { Flex } from "@chakra-ui/react";
import MintPage from "./components/MintPage";

export default function Home() {

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <MintPage />
    </Flex>
  );
}
