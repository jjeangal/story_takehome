'use client';

import { Button, Flex, Heading } from "@chakra-ui/react";
import { useStoryClient } from "../contexts/useStoryClient";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address } from "viem";

export default function Test() {

    const { client } = useStoryClient();

    if (!client) {
        return <div>Loading...</div>;
    }

    // async function logClient() {
    //     if (!client) return;
    //     await client.ipAsset.registerRootIp({
    //         tokenContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
    //         tokenId: "4",
    //         policyId: '0',
    //         txOptions: { waitForTransaction: true }
    //     })
    // }

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%">
            <Heading>Trying it out</Heading>
            <ConnectButton />
            <Button onClick={() => {
                // logClient();
            }}>Log client</Button>
        </Flex>
    );
}