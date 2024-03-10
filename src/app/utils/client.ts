import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http, createWalletClient, createPublicClient, custom } from 'viem';
import { sepolia } from "viem/chains";

export async function ConnectWalletClient() {
    // Check for window.ethereum
    let transport;
    if (window.ethereum) {
        transport = custom(window.ethereum);
    } else {
        const errorMessage = "MetaMask or another web3 wallet is not installed. Please install one to proceed.";
        throw new Error(errorMessage);
    }

    const [account] = await window.ethereum!.request({ method: 'eth_requestAccounts' })

    // Declare a Wallet Client
    const walletClient = createWalletClient({
        account: account,
        chain: sepolia,
        transport: transport,
    });

    return walletClient;
}

export function ConnectPublicClient() {
    // Check for window.ethereum
    let transport;
    if (window.ethereum) {
        transport = custom(window.ethereum);
    } else {
        const errorMessage = "MetaMask or another web3 wallet is not installed. Please install one to proceed.";
        throw new Error(errorMessage);
    }

    // Delcare a Public Client
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: transport,
    });

    return publicClient;
}

async function initializeStoryClient() {

    let transport;
    if (window.ethereum) {
        transport = custom(window.ethereum);
    } else {
        const errorMessage = "MetaMask or another web3 wallet is not installed. Please install one to proceed.";
        throw new Error(errorMessage);
    }

    const [account] = await window.ethereum!.request({ method: 'eth_requestAccounts' })

    const config: StoryConfig = {
        transport: http(process.env.RPC_PROVIDER_URL),
        account: account,
    };

    const client = StoryClient.newClient(config);
    return client;
}
