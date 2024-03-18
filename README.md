# 2024 Summer SWE Intern Exercise - Jean Gal

This week long project is an assignment given by story protocol, where I created a web application that allows users to generate AI images and register them as IP assets through the story protocol typescript sdk. The project is built using Next.js, TypeScript, RainbowKit and Chakra UI.

## Installation 

Install my-project with pnpm by running the following command:

```bash 
  pnpm install
```

## Getting Started

In order to make the `StoryClient` configuration work, a modification was made to the `StoryConfig` interface in the `@story-protocol/core-sdk` package. The `account` property, which originally only accepted an `Account` type, was updated to also accept an `Address` type. This change allows for more flexibility when providing the account information to the `StoryClient`. The updated `StoryConfig` interface is as follows:

```typescript
export interface StoryConfig {
    readonly account: Account | Address;
    readonly chainId?: SupportedChainIds;
    readonly transport: Transport;
}

```

## Environment Variables

- `NEXT_PUBLIC_RPC_PROVIDER_URL`: `"https://ethereum-sepolia-rpc.publicnode.com"`.

- `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`: `"0xC06189455340139e0EDCe0744d715ae43176CDD7"`.

- `NEXT_PUBLIC_WALLET_CONNECT_ID`: `"b80150a398759195441f9361eb151c24"`.

- `NEXT_PUBLIC_OPENAI_API_KEY`: `"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"`.

- `NEXT_PUBLIC_ENABLE_TESTNETS`: "true".

- `NEXT_PUBLIC_PINATA_API_JWT`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZmZmYjkyNC02ZDRlLTQzMmYtYTFmNC02N2Y3NWY4NjM2OGMiLCJlbWFpbCI6ImplYW5nYWwucHJvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzZDA2YjMwODcxZjg4MDg2N2MwMiIsInNjb3BlZEtleVNlY3JldCI6IjhhZmQ1ZGRiMDQ3ZTlhMGFjN2VlODdhMTk3OGEyMTZiMDI5ZWZmZTE1MWYwNjlmZTFmYjk1MjlhYTIzMzdhYjAiLCJpYXQiOjE3MTAzNjU0MTd9.uBExBWitufcHG405JRUu2Vwf9fa35ajIyE1M553xT_M"

- `NEXT_PUBLIC_STORY_API_KEY`: `"U3RvcnlQcm90b2NvbFRlc3RBUElLRVk="`.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Reference

### OpenAI Generate

**Endpoint:** `/api/openai/generate`

**Method:** `POST`

**Description:** This endpoint generates an image based on a provided prompt using OpenAI's DALL-E model. The generated image is returned as a URL. The prompt, model, quality, size, style, and number of images to generate can be specified in the request body. If no prompt is provided, "story protocol" is used as the default prompt.

### OpenAI Variations

**Endpoint:** `/api/openai/variations`

**Method:** `POST`

**Description:** This endpoint creates a variation of an image using OpenAI's DALL-E model. The image is provided in the request body as a URL. The image is downloaded, saved locally, and then read as a stream. This stream is passed to the `createVariation` method of the OpenAI client. The URL of the generated image variation is returned in the response.

### Pinata Upload File

**Endpoint:** `/api/pinata/upload-file`

**Method:** `POST`

**Description:** This endpoint uploads an image to IPFS using the Pinata service. The image is provided in the request body as a URL. The image is downloaded as a stream and then uploaded to IPFS using the `pinFileToIPFS` method of the Pinata SDK. The IPFS hash of the uploaded image is returned in the response.

### Story Get Asset

**Endpoint:** `/api/story/get-asset`

**Method:** `POST`

**Description:** This endpoint retrieves an asset from the Story Protocol API. The ID of the asset is provided in the request body. The asset is retrieved using a GET request to the Story Protocol API, and the response is returned in the response. The Story Protocol API key is read from the environment variables.

### Story List Assets

**Endpoint:** `/api/story/list-assets`

**Method:** `POST`

**Description:** This endpoint retrieves a list of assets from the Story Protocol API. The request does not require any parameters. The assets are retrieved using a POST request to the Story Protocol API with a pagination limit of 100. The response from the Story Protocol API is returned in the response. The Story Protocol API key is read from the environment variables.

## Providers

### ClientsProvider

The `ClientsProvider` is a context provider that provides instances of `StoryClient`, `WalletClient`, and `PublicClient`. These clients are used to interact with the Story Protocol and the Ethereum blockchain. The `StoryClient` is created with the current account address and the Ethereum provider from the window object. The `PublicClient` and `WalletClient` are created with the Sepolia testnet and the Ethereum provider from the window object.

### Web3Provider

The `Web3Provider` is a context provider that provides several contexts and configurations for the application. It uses the `ChakraProvider` to provide the Chakra UI theme, the `WagmiProvider` to provide the Wagmi configuration, the `QueryClientProvider` to provide the React Query client, and the `RainbowKitProvider` to provide the RainbowKit configuration. It also uses the `ClientsProvider` to provide the `StoryClient`, `WalletClient`, and `PublicClient`. The children components are rendered inside these providers, giving them access to these contexts and configurations.