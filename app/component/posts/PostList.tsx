"use client"

import getPostAll from "@/actions/getPostAll";
//コンポーネント

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSession } from "next-auth/react";


import { useEffect, useState } from "react";
import LikeButton from "../like/LikeButton";


const PostList = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>({})

  const session = useSession()

  //投稿を取得
  const getPost = async() => {
    const data = await getPostAll()
    setPosts([...data])
  }

  //現在のユーザを取得
  const getUser = async() => {
    const params = session.data?.user
    if (params) {
      const queryParams = new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
        if (value) acc[key] = value
        return acc;
      }, {} as Record<string, string>))
      
      const res = await fetch(`/api/user/?${queryParams.toString()}`)
      const user = await res.json()
      
      setCurrentUser({...user})
    }
  }

  useEffect(() => {
    getPost()
    if (session.status === "authenticated") {
      getUser()
    }

  },[session.status])

	return (
		<div className="max-w-[700px] w-full mx-auto mt-10">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>title</TableHead>
              <TableHead>post</TableHead>
              <TableHead className="text-center">like</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post, index) => (
              <TableRow>
                <TableCell className="font-medium">{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
                <TableCell className="text-center"><span>{post.favoritePosts.length}</span></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center">
                    <LikeButton postId={post.id} userId={currentUser.id}/>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
	)
}

export default PostList

