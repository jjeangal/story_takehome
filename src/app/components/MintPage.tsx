'use client';

import { Button, Box, Flex, Text, Input } from "@chakra-ui/react";
import { mint } from "./mint";
import { registerRootIp } from "./registerRoot";
import { StoryClient } from "@story-protocol/core-sdk";
import { PublicClient, WalletClient } from "viem";
import { useContext, useEffect, useState } from "react";
import { ClientsContext } from "../providers/clientsProvider";
import CreatePolicy from "./createPolicy";

export default function MintPage() {
    const walletClient: WalletClient | undefined = useContext(ClientsContext)?.walletClient;
    const publicClient: PublicClient | undefined = useContext(ClientsContext)?.publicClient;
    const storyClient: StoryClient | undefined = useContext(ClientsContext)?.storyClient;

    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [image, setImage] = useState<Blob>();
    const [ipfsHash, setIpfsHash] = useState<string>("");
    const [nftId, setNftId] = useState<string>("");

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
                <Box>

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
                h="100%"
            >
                <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                    h="40%"
                >
                    <Flex flexDirection="column" m="5%">
                        <Text fontSize="large" mb={4}>2 - Upload generated image to IPFS</Text>
                        <Button onClick={handleUploadFile} mb={4}>Upload</Button>
                        <Text fontSize="small" mb={4}>IPFS Hash: {ipfsHash ? ipfsHash : "..."}</Text>
                    </Flex>
                    <Flex flexDirection="column" m="5%">
                        <Text fontSize="large" mb={4}>3 - Mint generated image as an Nft</Text>
                        <Button onClick={handleMint} mb={4}>Mint</Button>
                        <Text fontSize="small" mb={4}>Nft Id: {nftId ? nftId : "..."}</Text>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    w="100%"
                    h="60%"
                >
                    <CreatePolicy />
                    <Button w="25%" mt={8} onClick={handleRegisterRoot}>Register Root IP</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}