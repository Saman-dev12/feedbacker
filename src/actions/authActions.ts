"use server"
import { db } from '~/server/db';
import {z} from 'zod'
import bcrypt from 'bcryptjs'

const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    password: z.string(),
  });
export const register = async (email: string, name: string, password: string) => {

    const result = registerSchema.safeParse({email,name,password});
    if (!result.success) {
      return {
        status: 400,
        errors: result.error.errors,
      };
    }
    const payload = result.data;
    try {
        const user = await db.user.findUnique({
            where: {
                email: payload.email
            }
        }) 
        if (user) {
            return {
                status: 400,
                message: 'User already exists'
            }
        }
        const salt = bcrypt.genSaltSync(10);
        payload.password = bcrypt.hashSync(payload.password, salt);
        const newUser = await db.user.create({ data: { ...payload, provider: 'local', oauth_id:null } });

        return {
            status: 200,
            message: 'User created successfully',
            data: newUser
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error'
        }
    }
}
