import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { StoryConfig } from "@story-protocol/core-sdk";
import { PublicClient, WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { StoryClient } from "@story-protocol/core-sdk";
import { sepolia } from 'wagmi/chains'
import React from "react";

interface ClientsContextType {
    storyClient: StoryClient | undefined;
    walletClient: WalletClient | undefined;
    publicClient: PublicClient | undefined;
}

export const ClientsContext = React.createContext<ClientsContextType | undefined>(undefined);

export function ClientsProvider({ children }: { children: React.ReactNode }) {
    const [storyClient, setStoryClient] = useState<StoryClient | undefined>(undefined);
    const account = useAccount();

    useEffect(() => {
        if (account.address) {
            const config: StoryConfig = {
                account: account.address,
                transport: typeof window == 'undefined' ? http() : custom(window.ethereum!),
                chainId: "sepolia"
            };

            const storyClient = StoryClient.newClient(config);
            setStoryClient(storyClient);
        } else {
            setStoryClient(undefined);
        };
    }, [account.address]);

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
    })

    const walletClient = createWalletClient({
        chain: sepolia,
        transport: typeof window !== 'undefined' ? custom(window.ethereum!) : http(),
    })

    return (
        <ClientsContext.Provider value={{ walletClient, publicClient, storyClient }}>
            {children}
        </ClientsContext.Provider>
    );
}