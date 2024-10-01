"use server"


import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

//make this using prisma
export const createPost = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const session = await getServerAuthSession();
    
    if (!session?.user.id) {
        console.error("No user session found");
        return;
    }

    // Check if user exists in the database
    const user = await db.user.findUnique({
        where: { id: session.user.id },
    });

    if (!user) {
        throw new Error('Invalid user ID: User does not exist');
    }

    console.log("Creating post for user:", session.user.id);
    
    const response = await db.post.create({
        data: {
            title,
            description,
            createdById: session.user.id
        }
    });

    return response;
}


export const getUserPosts = async () => {
    const session = await getServerAuthSession()
    if (!session) {
        return;
    }
    const response = await db.post.findMany({
        where: {
            createdById: session.user.id
        }
    });

    return response;
}

export const deletePost = async (postId:number) => {
    const session = await getServerAuthSession()
    if (!session?.user.id) {
        console.error("No user session found");
        return;
    }

    // Check if user exists in the database
    const user = await db.user.findUnique({
        where: { id: session.user.id },
    });

    if (!user) {
        throw new Error('Invalid user ID: User does not exist');
    }
    const response = await db.post.delete({
        where: {
            id: postId
        }
    });

    return response;
}

export const getPost = async (postId:number) => {
    // const session = await getServerAuthSession()
    // if (!session) {
    //     return;
    // }
    const response = await db.post.findUnique({
        where: {
            id: postId
        }
    });

    return response;
}