
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
  const body = await request.json()
  const {userId, postId} = body

  const like = {
    userId: userId,
    postId: postId
  }

  if(like) {
    const favoritePost = await prisma.favoritePost.create({
      data: like
    })

    return NextResponse.json(favoritePost)
  } else {
    return ""
  }
}