import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import axios from "axios";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req: NextRequest) {

    const { image } = await req.json();

    const imagePath = "./public/image.png";
    const img = await axios.get(image, { responseType: "arraybuffer" });
    fs.writeFileSync(imagePath, img.data);

    const imageStream = fs.createReadStream(imagePath);

    const response = await openai.images.createVariation({
        image: imageStream
    });

    const image_url = response.data[0].url;
    return NextResponse.json({ image_url }, { status: 200 });
}