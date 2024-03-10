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
