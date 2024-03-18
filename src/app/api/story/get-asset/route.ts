import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const storyKey = process.env.NEXT_PUBLIC_STORY_API_KEY || "";
    const body = await req.json();

    const response = await fetch('https://api.storyprotocol.net/api/v1/assets/' + body.id, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-Key': storyKey
        }
    });

    const result = await response.json();

    console.log(result);

    return NextResponse.json({ result }, { status: 200 });
}