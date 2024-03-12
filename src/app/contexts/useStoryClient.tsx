import {
    StoryClient,
    StoryConfig
} from "@story-protocol/core-sdk";
import { createWalletClient, http, custom, createPublicClient } from "viem";
import { sepolia } from 'viem/chains'
import { useAccount } from "wagmi";

export function useStoryClient(): { client: StoryClient | null } {

    const acc = useAccount();
    let client = null;

    if (acc && acc.address) {

        const config: StoryConfig = {
            account: acc.address as `0x${string}`,
            transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL),
        }

        client = StoryClient.newClient(config);
    }

    return { client };
}

export const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
})

export const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!)
});