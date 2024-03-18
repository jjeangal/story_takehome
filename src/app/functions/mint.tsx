import { Address, PublicClient, WalletClient } from "viem";
import abi from "../../contracts/swe.abi";
import { sepolia } from "viem/chains";
import { Dispatch, SetStateAction } from "react";

export async function mint(
    walletClient: WalletClient | undefined,
    publicClient: PublicClient | undefined,
    setNftId: Dispatch<SetStateAction<string>>,
    metadata: string
): Promise<`0x${string}`> {

    if (!walletClient) return "" as `0x${string}`;
    if (!publicClient) return "" as `0x${string}`;

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

    const receipt = await publicClient.waitForTransactionReceipt({ hash: hash });

    console.log(`Minted NFT successful with hash: ${hash}`);
    console.log(`Minted NFT tokenId: ${tokenId}`);
    console.log(receipt);

    return receipt;
}