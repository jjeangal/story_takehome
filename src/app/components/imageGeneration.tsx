import { Box, Button, Flex, Input, Image, Spinner } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

export default function ImageGeneration({ imageUrl, setImageUrl }: { imageUrl: string, setImageUrl: Dispatch<SetStateAction<string>> }) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleImageGeneration = async () => {
        const response = await fetch("/api/openai/generate", {
            method: "POST",
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            console.error('API call failed:', response);
            return;
        }

        const { image_url } = await response.json();
        setImageUrl(image_url);
        setIsGenerating(false);
    }

    return (
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
                borderColor="gray.800"
            >
                {imageUrl && <Image src={imageUrl} alt="Generated" />}
            </Box>
            <Input
                value={prompt}
                _hover={
                    {
                        borderColor: "gray.200"
                    }
                }
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write a prompt for AI generation"
                _placeholder={{ color: 'gray.700' }}
                textColor="gray.800"
                borderColor="gray.800"
                m={4}
                h="5%"
                w="512px"
            />
            <Button
                isDisabled={isGenerating}
                backgroundColor="gray.700"
                textColor="white"
                onClick={() => {
                    setIsGenerating(true);
                    handleImageGeneration();
                }}
                _hover={
                    {
                        backgroundColor: "gray.600"
                    }
                }
                h="5%"
                mb={4}
            >
                {isGenerating ? <Spinner color="black" /> : 'Generate'}
            </Button>
        </Flex>
    );
}