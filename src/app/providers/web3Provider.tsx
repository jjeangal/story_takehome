'use client';

import * as React from 'react';
import '@fontsource/baskervville';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains'
import { ClientsProvider } from './clientsProvider';

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

const theme = extendTheme({
    fonts: {
        heading: "Baskervville, sans-serif",
        body: "Baskervville, sans-serif"
    },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {

    return (
        <ChakraProvider theme={theme}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                        <ClientsProvider>
                            {children}
                        </ClientsProvider>
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ChakraProvider>
    );
}
