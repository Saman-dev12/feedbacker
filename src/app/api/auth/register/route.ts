import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {db as prisma} from "~/server/db";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = registerSchema.parse(body);

    // * Check email if it already exists
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (isEmailExist) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Email already taken. please use another email.",
        },
      });
    }

    // * Check username if it already exists
    const isUsernameExist = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (isUsernameExist) {
      return NextResponse.json({
        status: 400,
        errors: {
          username: "Username already taken. please use another username.",
        },
      });
    }

    // * Encrypt the password
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    await prisma.user.create({ data: { ...payload, provider: 'local', oauth_id:null } });
    return NextResponse.json({
      status: 200,
      message: "Account created successfully. Please login into your account!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: 400, errors: error.errors },
        { status: 200 }
      );
    }
  }
}