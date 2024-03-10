"use client"

import CommentForm from "@/app/component/comment/CommentForm"
import CommentList from "@/app/component/comment/CommentList"
import LikeButton from "@/app/component/like/LikeButton"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const postDetailPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter
  const query = params
  const [currentUser, setCurrentUser] = useState<any>({})

  const session = useSession()

  const [post, setPost] = useState<any>({})
  const [likeNumber, setLikeNumber] = useState(0)

  const getPostById = async() => {
    const queryParams = new URLSearchParams(query)
    const res = await fetch(`/api/posts/detail?${queryParams}`)

    if(res.status === 200) {
      const data = await res.json()
      setPost({...data})
      setLikeNumber(data.favoritePosts.length)
    }
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
    getPostById()
    if (session.status === "authenticated") {
      getUser()
    }
  },[session.status])

  // useEffect(() => {
  //   getPostById()
    
  // },[])

  // useCallback(() => {
  //   if (session.status === "authenticated") {
  //     getUser()
  //   }
  //   console.log("ddd");
    
  // },[session.status])

  // console.log(post);
  
	return (
		<div className="max-w-[700px] w-full mx-auto mt-10">
      <div>
        <h1 className="text-[32px] font-bold">{post.title}</h1>
        <span className="mt-8 flex">
          <LikeButton postId={post.id} userId={currentUser.id}/>
          <span className="block ml-2">{likeNumber}</span>
        </span>
        <p className="text-md mt-5">{post.body}</p>
      </div>
      <div>
        {/* コメントリスト */}
        {post.id && <CommentList postId={post.id}/>}
      </div>
      <div>
        <CommentForm postId={post.id} userId={currentUser.id}/>
      </div>
    </div>
	)
}

export default postDetailPage