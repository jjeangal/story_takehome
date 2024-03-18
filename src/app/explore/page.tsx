'use client';

import { Flex, Text, Image, Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IPAResponse } from "../../../types/globals";
import { useRouter } from "next/navigation";

export default function Explore() {

    const router = useRouter();
    const [results, setResults] = useState<IPAResponse[] | undefined>(undefined);

    const handleIPAs = async () => {
        const response = await fetch("/api/story/list-assets", {
            method: "POST",
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            console.error('API call failed:', response);
            return;
        }

        const { result } = await response.json();
        setResults(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        handleIPAs();
    }, []);

    return (
        results ? (
            <Flex justifyContent="center" bgColor="white" w="100%">
                <SimpleGrid columns={4} spacing={10} minH="90vh">
                    {results.map((ipa, index) => (
                        <Flex
                            flexDirection="column"
                            key={index}
                            alignItems="center"
                            justifyContent="center"
                            border="1px"
                            borderColor="black"
                            borderRadius="lg"
                            position="relative"
                            onClick={() => {
                                router.push('/explore/' + ipa.id);
                            }
                            }
                            _hover={{
                                borderColor: "red",
                                cursor: "pointer"
                            }}
                        >
                            <Image
                                src={ipa.metadata.uri}
                                alt={ipa.metadata.name}
                                boxSize="256px"
                                objectFit="cover"
                                borderTopRadius="lg"
                                borderBottom="1px"
                                borderBottomColor="black"
                                onError={(e) => {
                                    (e.target as any).src = '/no_image.png';
                                }}
                            />
                            {ipa.parentIpIds.length === 0 && (
                                <Box
                                    position="absolute"
                                    top="0"
                                    right="0"
                                    m="1"
                                    p="1"
                                    backgroundColor="white"
                                    borderRadius="lg"
                                    border="1px"
                                    borderColor="black"
                                >
                                    <Text color="black">root</Text>
                                </Box>
                            )}
                            <Text size="xs" color="black" isTruncated maxWidth="256px">{ipa.id}</Text>
                            <Text size="xs" color="black">{ipa.metadata.name || '\u00A0'}</Text>
                        </Flex>
                    ))}
                </SimpleGrid>
            </Flex>
        ) : (
            <Flex justifyContent="center" alignItems="center" bgColor="white" w="100%">
                <Spinner size='lg' />
            </Flex>
        )
    );
}