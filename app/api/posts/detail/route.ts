import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

//すべての投稿を取得
export async function GET(request:Request) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("id") ?? ""
    const posts = await prisma.post.findUnique({
        where: {
          id: postId 
        },
        include: {
          favoritePosts: true
        }
      }
    )
    return Response.json(posts)
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}