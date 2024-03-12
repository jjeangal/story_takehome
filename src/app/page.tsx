'use client'

import { Flex, Heading } from "@chakra-ui/react";
import MintPage from "./components/MintPage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Web3Context } from "./contexts/web3Provider";
import { useContext, useEffect, useState } from "react";
import { WalletClient, http, custom, PublicClient } from "viem";
import { useAccount } from "wagmi";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";

export default function Home() {

  const [storyClient, setStoryClient] = useState<StoryClient | undefined>();

  const walletClient: WalletClient = useContext(Web3Context)[0];
  const publicClient: PublicClient = useContext(Web3Context)[1];

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
      <MintPage story={storyClient} publicCli={publicClient} walletCli={walletClient} />
    </Flex>
  );
}
