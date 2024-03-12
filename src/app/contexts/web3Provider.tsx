'use client';

import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains'

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
    appName: 'RainbowKit demo',
    projectId: 'YOUR_PROJECT_ID',
    wallets: [
        ...wallets,
        {
            groupName: 'Other',
            wallets: [argentWallet, trustWallet, ledgerWallet],
        },
    ],
    chains: [sepolia],
    ssr: true,
});

const queryClient = new QueryClient();

export const Web3Context = React.createContext<any>(null);

export function Web3Provider({ children }: { children: React.ReactNode }) {

    const walletClient = createWalletClient({
        chain: sepolia,
        transport: typeof window !== 'undefined' ? custom(window.ethereum!) : http(),
    })

    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
    })

    return (
        <ChakraProvider>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                        <Web3Context.Provider value={[walletClient, publicClient]}>
                            {children}
                        </Web3Context.Provider>
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ChakraProvider>
    );
}
