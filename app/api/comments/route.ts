import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(request:Request) {
  
}

export async function POST(request:Request) {
  const body = await request.json()

  const { comment, userId, postId } = body

  //データベースへコメントを保存する
  const data = await prisma.comment.create({
    data: {
      comment,
      userId,
      postId
    }
  })

  return NextResponse.json(data)
}

