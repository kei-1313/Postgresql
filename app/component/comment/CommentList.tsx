"use client"

import { useEffect, useState } from "react";
import { formatDate } from "@/app/libs/formatDate"
import { FaRegTrashAlt } from "react-icons/fa";
import { PiPencilSimple } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

interface CommentListProps {
  postId: string;
  userId: string;
}

const CommentList:React.FC<CommentListProps> = ({postId, userId}) => {
  const [comment, setComment] = useState<any[]>([])
  const [isEdit, setIsEdit] = useState<any>({})
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
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

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/comments/", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) { 
        throw new Error(`HTTP error! status: ${res.status}`);
      }

    } catch (error) {
      console.error("An error occurred:", error);
     
    } finally {
      setIsLoading(false); 
    }
  }

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2">
                  <input type="text" defaultValue={item.comment} {...register("comment", { required: true })}  className="border border-gray-200 rounded-md px-4 py-2 w-full"/>
                  <input type="text" hidden defaultValue={item.id} {...register("commentId", { required: true })}  className="border border-gray-200 rounded-md px-4 py-2 w-full"/>
                  <Button type={"submit"}>保存</Button>
                </div>
              </form>
            ): (
              <p>{item.comment}</p>
            )}
        </li>
      ))}
    </ul>
	)
}

export default CommentList

