'use client';

import { Button, Flex, Heading } from "@chakra-ui/react";
import { useStoryClient } from "../contexts/useStoryClient";
import { stringToHex } from "viem";
import { mintNFT } from "./mintNft";
import { useState } from "react";

export default function Test() {
    const [mintResult, setMintResult] = useState<string>("");

    const handleButtonClick = async () => {
        const result = await mintNFT();
        console.log("the result is ", result)
        setMintResult(result);
    };

    const { client } = useStoryClient();

    async function registerRoot() {
        if (!client) return;
        try {
            const response = await client.ipAsset.registerRootIp({
                tokenContractAddress: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as `0x${string}`,
                tokenId: "3611",
                ipName: "Kenta",
                uri: "https://www.taketheredbean.com/",
                contentHash: stringToHex("KentaContentHash", { size: 32 }),
                policyId: "1",
                txOptions: { waitForTransaction: true }
            });

            console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)
        } catch (e) {
            console.log('This NFT has already been registered as an IP Asset!')
        }
    }

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%">
            <Heading>Trying it out</Heading>
            <Button onClick={handleButtonClick}>Log client</Button>
        </Flex>
    );
}