"use client";

import {
    StoryClient,
    StoryConfig
} from "@story-protocol/core-sdk";
import { JsonRpcAccount, http } from "viem";
import { useAccount } from "wagmi";

export function useStoryClient(): { client: StoryClient | undefined } {
    const acc = useAccount();

    if (!acc || !acc.address) return { client: undefined };

    const account: JsonRpcAccount = {
        address: acc.address,
        type: 'json-rpc'
    };

    if (typeof window !== "undefined") {
        const config: StoryConfig = {
            account,
            transport: http(process.env.RPC_PROVIDER_URL),
        }

        const client = StoryClient.newClient(config);

        return { client };
    }

    return { client: undefined };
}