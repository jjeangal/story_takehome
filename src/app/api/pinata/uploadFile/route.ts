import pinataSDK from "@pinata/sdk";
import { NextRequest, NextResponse } from "next/server";

const jwt = process.env.NEXT_PUBLIC_PINATA_API_JWT || "";

export async function POST(req: NextRequest) {

    const image = req.body;

    const pinata = new pinataSDK({ pinataJWTKey: jwt });

    const options = {
        pinataMetadata: {
            name: "My image",
        }
    };
    const response = await pinata.pinFileToIPFS(image, options);

    const hash = await response.IpfsHash;

    return NextResponse.json({ hash }, { status: 200 });
}