'use client';

import { Button, Flex, Text, Link, useToast } from "@chakra-ui/react";
import { mint } from "./mint";
import { registerRootIp } from "./registerRoot";
import { StoryClient } from "@story-protocol/core-sdk";
import { useContext, useState } from "react";
import { ClientsContext } from "../providers/clientsProvider";
import CreatePolicy from "./createPolicy";
import ImageGeneration from "./imageGeneration";
import { WalletClient, PublicClient } from "viem";

export default function MintPage() {
    const walletClient: WalletClient | undefined = useContext(ClientsContext)?.walletClient;
    const publicClient: PublicClient | undefined = useContext(ClientsContext)?.publicClient;
    const storyClient: StoryClient | undefined = useContext(ClientsContext)?.storyClient;

    const [imageUrl, setImageUrl] = useState<string>("https://gateway.pinata.cloud/ipfs/QmdJrAhTiXPa98xaxWKZs4dfahd8SZV9oqsHyUfjhq3G2X");

    const [policyId, setPolicyId] = useState<string>("");
    const [nftId, setNftId] = useState<string>("");

    const [uploading, setUploading] = useState<boolean>(false);
    const [registering, setRegistering] = useState<boolean>(false);

    const [ipfsHash, setIpfsHash] = useState<string>("");
    const [mintHashReceipt, setMintHashReceipt] = useState<string>("");
    const [rootHashReceipt, setRootHashReceipt] = useState<string>("");

    const toast = useToast();

    const handleRegisterRoot = async () => {
        if (mintHashReceipt === "") {
            toast({
                title: 'Await Mint.',
                description: "Nft not minted yet. Please mint an nft or wait for the transaction to finalize.",
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            return "Mint an nft first";
        }

        setRegistering(true);
        const result = await registerRootIp(storyClient!, publicClient!, policyId, ipfsHash, nftId);
        if (result) {
            setRegistering(false);
            setRootHashReceipt(result.transactionHash);
        };
    }

    const handleUploadFile = async () => {
        if (!walletClient || !publicClient) return;

        if (imageUrl === "https://gateway.pinata.cloud/ipfs/QmdJrAhTiXPa98xaxWKZs4dfahd8SZV9oqsHyUfjhq3G2X") {
            toast({
                title: 'Generate first.',
                description: "You need to generate an image before minting it.",
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
            return "Upload an image first";
        }
        setUploading(true);

        const body = {
            imageUrl: imageUrl
        };

        const resp_upload = await fetch("/api/pinata/uploadFile", {
            method: "POST",
            body: JSON.stringify(body)
        });

        if (!resp_upload.ok) return 'API call failed:' + resp_upload;

        const { hash } = await resp_upload.json();

        setIpfsHash("https://gateway.pinata.cloud/ipfs/" + hash);

        const mintHash = await mint(walletClient, publicClient, setNftId, hash);

        const receipt = await publicClient.waitForTransactionReceipt({ hash: mintHash as `0x${string}` });

        setMintHashReceipt(receipt);
        setUploading(false);
    }

    return (
        <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
        >
            <ImageGeneration imageUrl={imageUrl} setImageUrl={setImageUrl} />
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
                    h="35%"
                    p={4}
                >
                    <Flex flexDirection="column" textColor="gray.800" p={4} borderWidth={1} borderColor="gray.800" borderRadius="xl" w="100%">
                        <Flex direction="row" align="center" justify="space-between" mb={4}>
                            <Text fontSize="large">2 - Upload your image to IPFS and mint it as an NFT: </Text>
                            <Button
                                isDisabled={uploading}
                                textColor="white"
                                backgroundColor="gray.700"
                                onClick={() => {
                                    handleUploadFile();
                                }}
                                _hover={{
                                    backgroundColor: "gray.600"
                                }}
                                w="25%"
                                mr={4}
                            >
                                Upload
                            </Button>
                        </Flex>
                        <Text fontSize="small">
                            {ipfsHash ?
                                <>
                                    IPFS Hash:{" "}
                                    <Link href={ipfsHash} isExternal>
                                        {ipfsHash}
                                    </Link>
                                </> : ""}
                        </Text>
                        <Text fontSize="small">{nftId ? "NFT ID: " + nftId : ""}</Text>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="60%"
                    p={4}
                >
                    <CreatePolicy setPolicyId={setPolicyId} />
                    {!rootHashReceipt ?
                        <Button
                            isDisabled={registering}
                            backgroundColor="gray.700"
                            textColor="white"
                            w="25%"
                            mt={8}
                            onClick={handleRegisterRoot}
                            _hover={
                                {
                                    backgroundColor: "gray.600"
                                }
                            }
                        >Register Root IP</Button> :
                        <Text>Success! Hash: {rootHashReceipt}</Text>
                    }
                </Flex>
            </Flex>
        </Flex >
    );
}