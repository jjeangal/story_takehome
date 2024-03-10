import type { Metadata } from "next";
import { Web3Provider } from "@/app/contexts/web3Provider";
import '@rainbow-me/rainbowkit/styles.css';

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
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
