import { StoryClient } from "@story-protocol/core-sdk";
import { Address } from "viem";

export async function registerRootIp(client: StoryClient): Promise<[string, string]> {

    try {
        const response = await client.ipAsset.registerRootIp({
            tokenContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
            tokenId: "0",
            uri: "https://gateway.pinata.cloud/ipfs/Qm",
        });

        console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)

        if (response.txHash && response.ipId) {
            return [response.txHash, response.ipId];
        } else {
            console.error('Transaction hash or IP ID is undefined');
            return ["", ""];
        }
    } catch (e) {
        console.log(e);
        return ["", ""];
    }
}