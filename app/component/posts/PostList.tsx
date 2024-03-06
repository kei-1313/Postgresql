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
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const PostList = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [posts, setPosts] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>({})

  const session = useSession()
  // console.log(session.data?.user);
  
  
  const Icon = isLiked? AiFillHeart : AiOutlineHeart

  //投稿を取得
  const getPost = async() => {
    const data = await getPostAll()
    setPosts([...data])
  }

  const getUser = async() => {
    const params = session.data?.user
    if (params) {
      const queryParams = new URLSearchParams(Object.entries(params).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>))
      
      const res = await fetch(`/api/user/?${queryParams.toString()}`)
      const user = await res.json()

      // console.log(user);
      
      setCurrentUser({...user})
    }
  }

  useEffect(() => {
    getPost()
    if (session.status === "authenticated") {
      getUser()
    }

  },[session.status])

  // console.log(currentUser);
  

  const handleLike = async (postId: string, userId: string) => {
    const data = {
      userId: userId,
      postId: postId
    }

    console.log(data);
    

    if(!isLiked) {
      const res = await fetch("/api/likes/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }

  // console.log(posts);
  

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
                    <button onClick={() => handleLike(post.id, currentUser.id)}>
                      <Icon  className=" cursor-pointer" color={"#e0215c"} size={25} />
                    </button>
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

