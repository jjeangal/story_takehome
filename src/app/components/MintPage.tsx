'use client';

import { Button, Flex, Input } from "@chakra-ui/react";
import { mint } from "./mint";
import { registerRootIp } from "./registerRoot";
import { StoryClient } from "@story-protocol/core-sdk";
import { PublicClient, WalletClient } from "viem";
import { useContext, useState } from "react";
import { ClientsContext } from "../providers/clientsProvider";

export default function MintPage() {
    const walletClient: WalletClient | undefined = useContext(ClientsContext)?.walletClient;
    const publicClient: PublicClient | undefined = useContext(ClientsContext)?.publicClient;
    const storyClient: StoryClient | undefined = useContext(ClientsContext)?.storyClient;

    const [prompt, setPrompt] = useState('');

    const handleMint = async () => {
        const result = await mint(publicClient!, walletClient!);
        console.log("the result is ", result)
    };

    const handleRegisterRoot = async () => {
        const result = await registerRootIp(storyClient!);
        console.log("the result is ", result);
    }

    const handleImageGeneration = async () => {
        const response = await fetch("/api/openai/generate", {
            method: "POST",
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            console.error('API call failed:', response);
            return;
        }

        const { image_b64 } = await response.json();
        console.log("the result is ", image_b64);
    }

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%">
            <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write a prompt for AI generation"
                mb={4}
            />
            <Button onClick={handleImageGeneration}>Generate Image</Button>
            <Button onClick={handleMint}>Mint Nft</Button>
            <Button onClick={handleRegisterRoot}>Register Root IP</Button>
        </Flex>
    );
}