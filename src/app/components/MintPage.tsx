'use client';

import { Button, Flex } from "@chakra-ui/react";
import { mint } from "./mint";
import { registerRootIp } from "./registerRoot";
import { StoryClient } from "@story-protocol/core-sdk";
import { PublicClient, WalletClient } from "viem";
import { useContext } from "react";
import { ClientsContext } from "../contexts/clientsProvider";

export default function MintPage() {

    const walletClient: WalletClient = useContext(ClientsContext)[0];
    const publicClient: PublicClient = useContext(ClientsContext)[1];
    const storyClient: StoryClient | undefined = useContext(ClientsContext)[2];

    const handleMint = async () => {
        const result = await mint(publicClient!, walletClient);
        console.log("the result is ", result)
    };

    const handleRegisterRoot = async () => {
        const result = await registerRootIp(storyClient!);
        console.log("the result is ", result);
    }

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%">
            <Button onClick={handleMint}>Mint Nft</Button>
            <Button onClick={handleRegisterRoot}>Register Root IP</Button>
        </Flex>
    );
}