import { StoryClient } from "@story-protocol/core-sdk";
import { Address, PublicClient } from "viem";

export async function registerRootIp(
    client: StoryClient,
    publicClient: PublicClient,
    policyId: string,
    ipfsHash: string,
    nftId: string
) {
    if (client === undefined) return;
    if (ipfsHash === "") return;

    const response = await client.ipAsset.registerRootIp({
        tokenContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        tokenId: nftId,
        txOptions: { waitForTransaction: true },
        uri: ipfsHash,
    });

    console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)
    const receipt = await publicClient.waitForTransactionReceipt({ hash: response.txHash as `0x${string}` });
    return receipt;
}