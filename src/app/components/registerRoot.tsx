import { StoryClient } from "@story-protocol/core-sdk";
import { Address } from "viem";

export async function registerRootIp(
    client: StoryClient,
    policyId: string,
    ipfsHash: string,
    nftId: string,
    toast: any
) {
    if (client === undefined) return;
    if (ipfsHash === "") return;

    if (nftId == "") {
        toast({
            title: 'Mint first.',
            description: "You need to mint an NFT before registering one.",
            status: 'error',
            duration: 6000,
            isClosable: true,
        })
        return "Mint an nft first";
    };

    const response = await client.ipAsset.registerRootIp({
        tokenContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        tokenId: nftId,
        txOptions: { waitForTransaction: true },
        uri: ipfsHash,
    });

    console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)

    return response;
}