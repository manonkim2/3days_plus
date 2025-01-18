import { PrismaClient } from "@prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async () => {
    const res = await prisma.post.create({
        data: { description: 'hello' }
    })
    console.log(res)

    return NextResponse.json('ok')
};