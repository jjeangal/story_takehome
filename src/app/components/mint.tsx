import { Address, PublicClient, WalletClient } from "viem";
import abi from "../../contracts/swe.abi";
import { sepolia } from "viem/chains";

export async function mint(publicCli: PublicClient, walletCli: WalletClient): Promise<string> {

    if (!walletCli) return "Wallet Client undefined";
    if (!publicCli) return "Public Client undefined";

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