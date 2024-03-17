import type { Metadata } from "next";
import { Web3Provider } from "@/app/providers/web3Provider";
import '@rainbow-me/rainbowkit/styles.css';
import { Flex } from "@chakra-ui/react";
import Header from "./components/header/Header";

export const metadata: Metadata = {
  title: "Story Protocol Internship Take Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <Flex backgroundColor="white" w="100vw" height="100vh" flexDirection="column">
            <Header />
            <Flex h="90%">
              {children}
            </Flex>
          </Flex>
        </Web3Provider>
      </body>
    </html >
  );
}
