'use client';

import { Button, Box, Flex, Input } from "@chakra-ui/react";
import { mint } from "./mint";
import { registerRootIp } from "./registerRoot";
import { StoryClient } from "@story-protocol/core-sdk";
import { PublicClient, WalletClient } from "viem";
import { useContext, useEffect, useState } from "react";
import { ClientsContext } from "../providers/clientsProvider";

export default function MintPage() {
    const walletClient: WalletClient | undefined = useContext(ClientsContext)?.walletClient;
    const publicClient: PublicClient | undefined = useContext(ClientsContext)?.publicClient;
    const storyClient: StoryClient | undefined = useContext(ClientsContext)?.storyClient;

    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<Blob>();
    const [isGenerating, setIsGenerating] = useState(false);
    const [ipfsHash, setIpfsHash] = useState<string>("");

    useEffect(() => {
        console.log("starting");
        fetch('/generate.png')
            .then(response => response.blob())
            .then(blob => setImage(blob));
    }, []);

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
        const responseFetch = await fetch(`data:image/png;base64,${image_b64}`);
        const blob = await responseFetch.blob();
        setImage(blob);
        setIsGenerating(false);
    }

    // const reader = new FileReader();
    // reader.onloadend = function () {
    //     const arrayBuffer = reader.result;
    //     console.log(arrayBuffer);
    // }

    const handleUploadFile = async () => {
        if (!image) {
            console.log('No image to upload');
            return;
        }

        //const buff = reader.readAsArrayBuffer(image);

        // const response = await fetch("/api/pinata/uploadFile", {
        //     method: "POST",
        //     body: formData,
        // });

        // console.log("response", response);
        // if (!response.ok) return 'API call failed:' + response;

        // const { hash } = await response.json();
        // setIpfsHash(hash);
        // console.log("hash", hash);
    }

    return (
        <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
        >
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w="50%"
                h="100%"
            >
                <Box
                    width="512px"
                    height="512px"
                    border="1px"
                    borderColor="gray.400"
                >
                    {image && <img src={URL.createObjectURL(image)} alt="Generated" />}
                </Box>
                <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Write a prompt for AI generation"
                    m={4}
                    h="5%"
                    w="512px"
                />
                <Button
                    isDisabled={isGenerating}
                    onClick={() => {
                        setIsGenerating(true);
                        handleImageGeneration();
                    }}
                    h="5%"
                    mb={4}
                >
                    {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
            </Flex>
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="50%"
            >
                <Button onClick={handleUploadFile} mb={4}>Upload Image</Button>
                <Button onClick={handleMint} mb={4}>Mint Nft</Button>
                <Button onClick={handleRegisterRoot}>Register Root IP</Button>
            </Flex>
        </Flex>
    );
}