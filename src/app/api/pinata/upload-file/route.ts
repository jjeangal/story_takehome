import got from 'got';
import pinataSDK from "@pinata/sdk";
import { NextRequest, NextResponse } from "next/server";

const jwt = process.env.NEXT_PUBLIC_PINATA_API_JWT || "";
const pinata = new pinataSDK({ pinataJWTKey: jwt });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const stream = got.stream(body.imageUrl);

        const options = {
            pinataMetadata: {
                name: "My image",
            }
        };

        const response = await pinata.pinFileToIPFS(stream, options);
        const hash = await response.IpfsHash;

        return NextResponse.json({ hash }, { status: 200 });

    } catch (error) {
        throw error;
    }
}
