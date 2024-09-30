"use server"

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export const getFeedbacks = async(id:number) =>{
    const session = getServerAuthSession();
    if (!session) {
        return;
    }

    const feedbacks = await db.feedback.findMany({
        where: {
            postId: id
        }
    });
    return feedbacks;
}

export const createFeedback = async (postId:number, content:string) => {
    const session = await getServerAuthSession()
    if (!session) {
        return;
    }
    const response = await db.feedback.create({
        data: {
            content: content,
            postId: postId,
        }
    });

    return response;
}