import {
    StoryClient,
    StoryConfig
} from "@story-protocol/core-sdk";
import { createWalletClient, http, custom, createPublicClient } from "viem";
import { sepolia } from 'viem/chains'
import { useAccount } from "wagmi";
import { JsonRpcAccount } from "viem";
import 'viem/window';

export function useStoryClient(): { client: StoryClient } {

    const acc = useAccount();

    const account: JsonRpcAccount = {
        address: acc.address as `0x${string}`,
        type: 'json-rpc'
    };

    const config: StoryConfig = {
        account,
        transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL),
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