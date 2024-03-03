import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

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