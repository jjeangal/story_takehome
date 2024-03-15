import { StoryClient } from "@story-protocol/core-sdk";
import { Address } from "viem";

export async function registerRootIp(client: StoryClient) {

    if (client === undefined) return;

    const response = await client.ipAsset.registerRootIp({
        tokenContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        tokenId: "6",
        txOptions: { waitForTransaction: true },
        uri: "https://gateway.pinata.cloud/ipfs/Qm",
    });

    console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)

    return response;
}