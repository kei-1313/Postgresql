"use client"

import { useEffect, useState } from "react";
import { formatDate } from "@/app/libs/formatDate"
import { FaRegTrashAlt } from "react-icons/fa";
import { PiPencilSimple } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CommentListProps {
  postId: string;
  userId: string;
}

const CommentList:React.FC<CommentListProps> = ({postId, userId}) => {
  const [comment, setComment] = useState<any[]>([])
  const [isEdit, setIsEdit] = useState<any>({})
  const router = useRouter()
  const getCommentByPostId = async(id: string) => {
    const params = {
      postId: id
    }

    const queryParams = new URLSearchParams(params)
    
    const res = await fetch(`/api/comments?${queryParams}`)
    
    if(res.status === 200) {
      const comment = await res.json()
      setComment([...comment])
    }
  }

  const handleDelete = async (commentId:string) => {
    
    if (window.confirm("Do you really want to delete the comment?")) {
      try {
        const params = {
          commentId
        }
        const queryParams = new URLSearchParams(params)
        const res = await fetch(`/api/comments?${queryParams}`, {
          method: "DELETE"
        })
        router.refresh()
      } catch (error) {
        
      }
    } else {
      console.log("Canceled");
      
    }
  }

  //編集
  const handleEdit = (id:string) => {
    setIsEdit((prev: {[key: string]: boolean}) => ({...prev, [id]: true}))
  }

  useEffect(() => {
    getCommentByPostId(postId)
  },[])

  console.log(comment[0]);

	return (
		<ul className="mt-8">
      {comment?.map((item, index) => (
        <li className="mb-5" key={item.id}>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 mb-2">
              <span className="text-sm text-gray-500">{formatDate(item.createdAt)}</span>
              <span className="text-sm">{item.user.name}</span>
            </div>
            <div className="flex gap-3">
              {item.user.id === userId && (<div>
                <PiPencilSimple onClick={() => handleEdit(item.id)}  className="cursor-pointer"/>
              </div>)}
              <div>
                <FaRegTrashAlt onClick={() => handleDelete(item.id)} className="cursor-pointer"/>
              </div>
            </div>
          </div>
          {isEdit[item.id]? 
            (
              <div className="flex gap-2">
                <input type="text" value={item.comment}  className="border border-gray-200 rounded-md px-4 py-2 w-full"/>
                <Button>保存</Button>
              </div>
            ): (
              <p>{item.comment}</p>
            )}
        </li>
      ))}
    </ul>
	)
}

export default CommentList

