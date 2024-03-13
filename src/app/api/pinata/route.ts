import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const { image } = await req.json();

}