'use client';

import { Button, Flex } from "@chakra-ui/react";
import { mint } from "./mint";
import { registerRootIp } from "./registerRoot";
import { StoryClient } from "@story-protocol/core-sdk";
import { PublicClient, WalletClient } from "viem";
import { useContext } from "react";
import { Web3Context } from "../contexts/web3Provider";

export default function MintPage({
    story,
}: {
    story: StoryClient | undefined,
}) {

    const walletClient: WalletClient = useContext(Web3Context)[0];
    const publicClient: PublicClient = useContext(Web3Context)[1];

    const handleMint = async () => {
        const result = await mint(publicClient!, walletClient);
        console.log("the result is ", result)
    };

    const handleRegisterRoot = async () => {
        const result = await registerRootIp(story!);
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