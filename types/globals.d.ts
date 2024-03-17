// globals.d.ts or window.d.ts
interface Window {
    ethereum?: {
        // You can add any specific methods you use from window.ethereum here
        request: (...args: any[]) => Promise<any>;
        on?: (...args: any[]) => void;
        removeListener?: (...args: any[]) => void;
        // Add other properties and methods as needed
    };
}

export type IPAResponse = {
    blockNumber: string;
    blockTimestamp: string;
    chainId: string;
    childIpIds: string[];
    id: string;
    metadata: {
        name: string;
        hash: string;
        registrationDate: string;
        registrant: string;
        uri: string;
    };
    metadataResolverAddress: string;
    parentIpIds: string[];
    rootIpIds: string[];
    tokenContract: string;
    tokenId: string;
};