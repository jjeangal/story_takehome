import { Address } from "viem";
import { publicClient, walletClient } from "../contexts/useStoryClient";
import abi from "../../contracts/swe.abi";

export async function mint(): Promise<string> {

    const [account] = await walletClient.getAddresses();

    const { result } = await publicClient.simulateContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        functionName: 'mint',
        account,
        args: ["https://www.taketheredbean.com/"],
        abi: abi
    })

    const hash = await walletClient.writeContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        functionName: 'mint',
        account: account,
        args: ["https://www.taketheredbean.com/"],
        abi: abi
    });

    let tokenId = (result as string).toString();

    console.log(`Minted NFT successful with hash: ${hash}`);
    console.log(`Minted NFT tokenId: ${tokenId}`);

    return tokenId;
}