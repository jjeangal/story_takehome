'use client';

import { Button, Flex } from "@chakra-ui/react";
import { useStoryClient } from "../contexts/useStoryClient";
import { mintNFT } from "./mintNft";
import { registerRootIp } from "./registerRoot";

export default function Test() {
    const { client } = useStoryClient();

    const handleMint = async () => {
        const result = await mintNFT();
        console.log("the result is ", result)
    };

    const handleRegisterRoot = async () => {
        const result = await registerRootIp(client!);
        console.log("the result is ", result);
    }

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%">
            <Button onClick={handleMint}>Log client</Button>
            <Button onClick={handleRegisterRoot}>Register Root</Button>
        </Flex>
    );
}