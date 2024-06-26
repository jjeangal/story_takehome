import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req: NextRequest) {

    const { prompt } = await req.json();

    const response = await openai.images.generate({
        response_format: 'url', // or 'url'
        prompt: prompt || "story protocol",
        model: "dall-e-2",
        quality: 'standard', // or 'hd' -> only for dall-e-3
        size: '512x512', //'1024x1024' | '1792x1024' | '1024x1792' -> for dall-e-3
        style: 'natural', // or natural
        n: 1, // number of images to generate
    });

    console.log(response.data);
    const image_url = response.data[0].url;
    return NextResponse.json({ image_url }, { status: 200 });
}