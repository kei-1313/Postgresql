"use client"

import { useEffect, useState } from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import prisma from "@/app/libs/prismadb"

interface LikeButtonProps {
  postId: string;
  userId: string;
}

const LikeButton:React.FC<LikeButtonProps> = ({postId, userId}) => {
  const [isLiked, setIsLiked] = useState(false)

  const Icon = isLiked? AiFillHeart : AiOutlineHeart

  // posdIdが変化する場合→投稿が複数ある場合
  // userIdが変化する場合→ログインしているユーザが違う場合
  useEffect(() => {
    const getLikedPost = async() => {
      const params = {
        userId: userId,
        postId: postId
      }

      const queryParams = new URLSearchParams(params)
      const data = await fetch(`/api/likes?${queryParams}`)
      if(data) {
        setIsLiked(true)
      }
    }

    getLikedPost()

  }, [postId, userId])

  const handleLike = async (postId: string, userId: string) => {
    const data = {
      userId: userId,
      postId: postId
    }

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
	return (
		<button onClick={() => handleLike(postId, userId)}>
      <Icon  className=" cursor-pointer" color={isLiked ? '#e0215c' : '#e0215c'} size={25} />
    </button>
	)
}

export default LikeButton

