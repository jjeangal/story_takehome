'use client';

import { Flex, Button } from "@chakra-ui/react";
import { useRouter, usePathname } from 'next/navigation'

export default function PageTabs() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Flex
            bg="gray.700"
            alignItems="center"
            justifyContent="center"
            textColor="white"
            borderRadius="2xl"
            h="65%"
            w="40%"
            minW="200px"
        >
            <Flex
                w="50%"
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    borderRadius="xl"
                    _hover={{}}
                    backgroundColor={
                        `${pathname === '/upload' ? "gray.600" : "gray.700"}`
                    }
                    onClick={() => router.push('/upload')}
                >
                    Upload
                </Button>
            </Flex>
            <Flex
                w="50%"
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    borderRadius="xl"
                    _hover={{}}
                    backgroundColor={
                        `${pathname === '/explore' ? "gray.600" : "gray.700"}`
                    }
                    onClick={() => router.push('/explore')}
                >
                    Explore
                </Button>
            </Flex>
        </Flex>
    );
}