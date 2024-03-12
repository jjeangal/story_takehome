'use client';

import { Button, Flex } from "@chakra-ui/react";
import { mint } from "./mint";
import { registerRootIp } from "./registerRoot";
import { useStoryClient } from "../contexts/useStoryClient";

export default function MintPage() {

    const { client } = useStoryClient();

    const handleMint = async () => {
        const result = await mint();
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
            <Button onClick={handleMint}>Mint Nft</Button>
            <Button onClick={handleRegisterRoot}>Register Root IP</Button>
        </Flex>
    );
}