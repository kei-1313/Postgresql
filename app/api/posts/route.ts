import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

//すべての投稿を取得
export async function GET() {
  try {
    const posts = await prisma.post.findMany()
    return Response.json(posts)
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}

//新規投稿を作成
export async function POST(request:Request) {
  const body = await request.json()

  const {title, post} = body

  //データベースへ投稿を保存する
  const data = await prisma.post.create({
    data: {
      title,
      body: post
    }
  })

  return NextResponse.json(data)
}