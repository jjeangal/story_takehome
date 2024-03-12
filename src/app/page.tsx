'use client'

import { Flex, Heading } from "@chakra-ui/react";
import MintPage from "./components/MintPage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { http, custom } from "viem";
import { useAccount } from "wagmi";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";

export default function Home() {

  const [storyClient, setStoryClient] = useState<StoryClient | undefined>();

  const account = useAccount();

  useEffect(() => {
    if (account.address) {
      const config: StoryConfig = {
        account: account.address,
        transport: typeof window == 'undefined' ? http() : custom(window.ethereum!),
        chainId: "sepolia"
      };

      const storyClient = StoryClient.newClient(config);
      setStoryClient(storyClient);
    } else {
      setStoryClient(undefined);
    };
  }, [account.address]);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%">
      <Heading>Story Protocol</Heading>
      <ConnectButton />
      <MintPage story={storyClient} />
    </Flex>
  );
}
