'use client';

import { Button, Flex } from "@chakra-ui/react";
import { mint } from "./mint";
import { registerRootIp } from "./registerRoot";
import { StoryClient } from "@story-protocol/core-sdk";
import { PublicClient, WalletClient } from "viem";

export default function MintPage({
    story,
    publicCli,
    walletCli
}: {
    story: StoryClient | undefined,
    publicCli: PublicClient | undefined,
    walletCli: WalletClient | undefined
}) {

    const handleMint = async () => {
        const result = await mint(publicCli!, walletCli!);
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