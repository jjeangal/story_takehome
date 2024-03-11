import {
    StoryClient,
    StoryConfig
} from "@story-protocol/core-sdk";
import { JsonRpcAccount, createWalletClient, http, custom, createPublicClient } from "viem";
import { useAccount } from "wagmi";
import { sepolia } from 'viem/chains'

export function useStoryClient(): { client: StoryClient | undefined } {
    const acc = useAccount();

    if (!acc || !acc.address) return { client: undefined };

    const account: JsonRpcAccount = {
        address: acc.address,
        type: 'json-rpc'
    };
    const config: StoryConfig = {
        account,
        transport: http(process.env.RPC_PROVIDER_URL),
    }

    const client = StoryClient.newClient(config);

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