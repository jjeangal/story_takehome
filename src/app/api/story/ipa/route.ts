import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const storyKey = process.env.NEXT_PUBLIC_STORY_API_KEY || "";

    const response = await fetch("https://api.storyprotocol.net/api/v1/assets", {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'X-API-Key': storyKey,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            options: {
                pagination: { limit: 100 }
            }
        })
    });

    const result = await response.json();

    return NextResponse.json({ result }, { status: 200 });
}