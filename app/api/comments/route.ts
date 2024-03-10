import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(request:Request) {

  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("postId") ?? ""

    const comment = await prisma.comment.findMany({
      where: {
        postId: postId,
      }
    })

    if(!comment) {
      return ""
    }

    return NextResponse.json(comment)
    
  } catch (error) {
    console.error("Faild fetching comment", error);
  }
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

