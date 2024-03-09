import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(request:Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get("email") || undefined

    //どの投稿にいいねしているかもいれる
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    })

    return NextResponse.json(user)

  } catch (error) {
    console.error("Faild fetching user", error);
  }
}