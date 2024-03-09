
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function GET(request:Request) {

  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") ?? ""
    const postId = searchParams.get("postId") ?? ""

    //postIdとuserIdをクエリパラメータで受け取る
    const likedPost = await prisma.favoritePost.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        }
      }
    })
    
    if(!likedPost) {
      return ""
    }

    return NextResponse.json(likedPost)
  } catch (error) {
    console.error("Faild fetching user", error);
  }
  
}

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

export async function DELETE(request:Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") ?? ""
  const postId = searchParams.get("postId") ?? ""

  //postIdとuserIdをクエリパラメータで受け取る
  const deletelikedPost = await prisma.favoritePost.delete({
    where: {
      userId_postId: {
        userId: userId,
        postId: postId,
      }
    }
  })

  return NextResponse.json(deletelikedPost)
}