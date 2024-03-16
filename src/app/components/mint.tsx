import { Address, PublicClient, WalletClient } from "viem";
import abi from "../../contracts/swe.abi";
import { sepolia } from "viem/chains";
import { Dispatch, SetStateAction, useContext } from "react";
import { ClientsContext } from "../providers/clientsProvider";

export async function mint(
    walletClient: WalletClient | undefined,
    publicClient: PublicClient | undefined,
    setNftId: Dispatch<SetStateAction<string>>,
    metadata: string
): Promise<string> {

    if (!walletClient) return "Wallet Client undefined";
    if (!publicClient) return "Public Client undefined";

    const [account] = await walletClient.getAddresses();

    const { result } = await publicClient.simulateContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        functionName: 'mint',
        account,
        args: [metadata],
        abi: abi
    })

    const hash = await walletClient.writeContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        functionName: 'mint',
        account: account,
        args: [metadata],
        abi: abi,
        chain: sepolia
    });

    let tokenId = (result as string).toString();
    setNftId(tokenId);

    console.log(`Minted NFT successful with hash: ${hash}`);
    console.log(`Minted NFT tokenId: ${tokenId}`);

    return hash;
}