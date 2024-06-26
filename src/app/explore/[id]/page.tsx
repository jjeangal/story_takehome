'use client'

import { Box, Flex, Image, Spinner, Text, Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IPAResponse } from "../../../../types/globals";
import { ImSpinner11 } from "react-icons/im";

export default function IPA({ params }: { params: { id: string } }) {

    const [ipa, setIpa] = useState<IPAResponse>();
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isImageGenerated, setIsImageGenerated] = useState(false);
    const [image, setImage] = useState<string | undefined>(ipa?.metadata.uri);

    const toast = useToast();

    const handleUpdateImage = async () => {
        const body = {
            prompt: prompt,
            image: ipa?.metadata.uri
        };

        const resp_upload = await fetch("/api/openai/variation", {
            method: "POST",
            body: JSON.stringify(body)
        });

        if (!resp_upload.ok) {
            setIsGenerating(false);
            toast({
                title: 'Error with variation generation.',
                description: resp_upload.statusText,
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
            return 'API call failed:' + resp_upload;
        }

        const { image_url } = await resp_upload.json();
        setImage(image_url);
        setIsGenerating(false);
        setIsImageGenerated(true);
    }

    const getIPA = async () => {

        const body = JSON.stringify({ id: params.id });

        const response = await fetch(`/api/story/get-asset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })

        if (!response.ok) {
            console.error('API call failed:', response);
            return;
        }

        const { result } = await response.json();

        setIpa(result.data);
        setLoading(false);

        return result.data;
    };

    useEffect(() => {
        const fetchIPA = async () => {
            const ipa: IPAResponse = await getIPA();
            setImage(ipa?.metadata.uri);
        };

        fetchIPA();
    }, []);

    const DataRow = ({ label, value }: { label: string, value: string }) => (
        <Flex flexDirection="row" isTruncated justifyContent="space-between" w="80%">
            <Text>{label}</Text>
            <Text justifyContent="left">{value}</Text>
        </Flex>
    );

    return (
        !loading && ipa ? (
            <Flex flexDirection="row" alignItems="center" justifyContent="center" h="100%" w="100%" textColor="black">
                <Flex
                    borderColor="black"
                    border="1px"
                    borderRadius="xl"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    w='50%'
                    p={4}
                    m={4}
                >
                    <DataRow label="ID" value={ipa?.id} />
                    <DataRow label="Chain ID" value={ipa.chainId} />
                    <DataRow label="Parent IP IDs" value={ipa?.parentIpIds.join(', ')} />
                    <DataRow label="Child IP IDs" value={ipa?.childIpIds.join(', ')} />
                    <DataRow label="Root IP IDs" value={ipa?.rootIpIds.join(', ')} />
                    <DataRow label="Token ID" value={ipa?.tokenId} />
                    <DataRow label="Token Contract" value={ipa?.tokenContract.substring(0, 40) + (ipa?.tokenContract.length > 40 ? '...' : '')} />
                    <DataRow label="Metadata Resolver Address" value={ipa?.metadataResolverAddress.substring(0, 30) + (ipa?.metadataResolverAddress.length > 30 ? '...' : '')} />
                    <DataRow label="Block Number" value={ipa?.blockNumber} />
                    <DataRow label="Block Timestamp" value={ipa?.blockTimestamp} />
                    <Text justifyContent="left" fontWeight="bold" mt={4}>Metadata:</Text>
                    <DataRow label="Name" value={ipa?.metadata.name} />
                    <DataRow label="Hash" value={ipa?.metadata.hash.substring(0, 40) + (ipa?.metadata.hash.length > 40 ? '...' : '')} />
                    <DataRow label="Registration Date" value={ipa?.metadata.registrationDate} />
                    <DataRow label="Registrant" value={ipa?.metadata.registrant} />
                    <DataRow label="URI" value={ipa?.metadata.uri.substring(0, 40) + (ipa?.metadata.uri.length > 40 ? '...' : '')} />
                </Flex>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    h="100%"
                    w='50%'
                >
                    <Flex
                        flexDirection="column"
                        position="relative"
                        justifyContent="center"
                        h="100%"
                    >
                        <Image
                            src={image}
                            alt={ipa?.metadata.name}
                            objectFit="cover"
                            boxSize={{ base: "256px", sm: "350px", md: "400px", lg: "450px" }}
                            onError={(e) => {
                                (e.target as any).src = '/no_image.png';
                            }}
                        />
                        <Button
                            isDisabled={isGenerating}
                            backgroundColor="gray.700"
                            textColor="white"
                            onClick={() => {
                                setIsGenerating(true);
                                handleUpdateImage();
                            }}
                            _hover={
                                {
                                    backgroundColor: "gray.600"
                                }
                            }
                            h="5%"
                            m={4}
                        >
                            {isGenerating ? <Spinner size="sm" color="black" /> : 'Create Variation'}
                        </Button>
                        {isImageGenerated && (
                            <Box
                                position="absolute"
                                top="0"
                                right="0"
                                m="1"
                                p="1"
                                backgroundColor="white"
                                borderRadius="lg"
                                border="1px"
                                borderColor="gray.300"
                            >
                                <ImSpinner11 color="green.500" />
                            </Box>
                        )}
                        <Button
                            backgroundColor="gray.700"
                            textColor="white"
                            _hover={{ backgroundColor: "gray.600" }}
                            h="5%"
                            m={4}
                        >
                            Mint License
                        </Button>
                        <Button
                            backgroundColor="gray.700"
                            textColor="white"
                            _hover={{ backgroundColor: "gray.600" }}
                            h="5%"
                            m={4}
                        >
                            Register Derivative
                        </Button>
                    </Flex>
                </Flex>
            </Flex >
        ) : (
            <Flex justifyContent="center" alignItems="center" bgColor="white" w="100%">
                <Spinner size='lg' />
            </Flex>
        )
    );
}