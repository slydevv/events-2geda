import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


export  async function POST(req:NextRequest) {
    const body = await req.json();
    const { email, password, name } = body
    
    try {
        if (!email || !password) {
            return NextResponse.json({error:"Fill in email & password"}, {status:401})
        }
        const userExist = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (userExist) {
            return NextResponse.json({error:"This email has already been used"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await prisma.user.create({
            data: {
                email,
                hashedPassword: hashedPassword,
                name
            }
        })

        return NextResponse.json({newUser})
    } catch (error) {
        return NextResponse.json(error, {status:400})
    }
}