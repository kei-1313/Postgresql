"use client"

import { useEffect, useState } from "react";
import { formatDate } from "@/app/libs/formatDate"

interface CommentListProps {
  postId: string;
}

const CommentList:React.FC<CommentListProps> = ({postId}) => {
  const [comment, setComment] = useState<any[]>([])
  const getCommentByPostId = async(id: string) => {
    const params = {
      postId: id
    }

    console.log(params);
    

    const queryParams = new URLSearchParams(params)
    
    const res = await fetch(`/api/comments?${queryParams}`)
    console.log(res);
    
    if(res.status === 200) {
      const comment = await res.json()
      console.log(comment);
      
      setComment([...comment])
    }
  }

  useEffect(() => {
    getCommentByPostId(postId)
  },[])

  // console.log(comment);

	return (
		<ul className="mt-8">
      {comment?.map((item, index) => (
        <li className="mb-5">
          <div className="flex gap-3 mb-2">
            <span className="text-sm text-gray-500">{formatDate(item.createdAt)}</span>
            <span className="text-sm">{item.user.name}</span>
          </div>
          <p>{item.comment}</p>
        </li>
      ))}
    </ul>
	)
}

export default CommentList

