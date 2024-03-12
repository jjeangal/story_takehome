import { Address, PublicClient, WalletClient } from "viem";
import abi from "../../contracts/swe.abi";
import { sepolia } from "viem/chains";

export async function mint(publicCli: PublicClient, walletCli: WalletClient): Promise<string> {

    if (!walletCli) return "Wallet Client not defined";
    if (!publicCli) return "Public Client not defined";

    const [account] = await walletCli.getAddresses();

    const { result } = await publicCli.simulateContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        functionName: 'mint',
        account,
        args: ["https://www.taketheredbean.com/"],
        abi: abi
    })

    const hash = await walletCli.writeContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address,
        functionName: 'mint',
        account: account,
        args: ["https://www.taketheredbean.com/"],
        abi: abi,
        chain: sepolia
    });

    let tokenId = (result as string).toString();

    console.log(`Minted NFT successful with hash: ${hash}`);
    console.log(`Minted NFT tokenId: ${tokenId}`);

    return tokenId;
}