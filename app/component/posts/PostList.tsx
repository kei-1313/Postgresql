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


import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const PostList = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [posts, setPosts] = useState<any[]>([])
  
  const Icon = isLiked? AiFillHeart : AiOutlineHeart

  //投稿を取得
  const getPost = async() => {
    const data = await getPostAll()
    setPosts([...data])
  }

  useEffect(() => {
    getPost()
  },[])
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
                <TableCell className="text-center"><span>0</span></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center">
                    <Icon className=" cursor-pointer" color={"#e0215c"} size={25} />
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

