'use client';

import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { sepolia } from 'wagmi/chains'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        sepolia
    ],
    [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || '';

const { wallets } = getDefaultWallets({
    appName: 'RainbowKit demo',
    projectId,
    chains,
});

const demoAppInfo = {
    appName: 'Story Protocol Internship Take Home',
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <ChakraProvider>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
                    {mounted && children}
                </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    );
}
