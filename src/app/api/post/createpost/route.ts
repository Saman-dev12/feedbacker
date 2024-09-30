//create post
import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
export async function POST(request: NextRequest) {
    const session = await getServerAuthSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const { title, description } = await request.json();
        const post = await db.post.create({
            data: {
                title,
                description,
                createdById: session.user.id
            }
        });
        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}