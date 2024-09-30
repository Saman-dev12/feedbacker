import { NextRequest,NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(request: NextRequest) {
    const session = await getServerAuthSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const posts = await db.post.findMany({
            where: {
                createdById: session.user.id
            }
        });
        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}