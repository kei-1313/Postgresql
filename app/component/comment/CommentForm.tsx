"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

interface CommentFormProps {
  postId: string;
  userId: string;
}

const CommentForm:React.FC<CommentFormProps> = ({postId, userId}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>(
    {
      defaultValues: {
        comment: '',
      }
    }
  )

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const params = {
        postId,
        userId
      }
  
      const newComment = {...params, ...data}
  
      const res = await fetch("/api/comments/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      })

      console.log(res);
      
      router.refresh()

      setIsLoading(false);
      reset()
    } catch (error) {
      console.error("An error occurred:", error);
      // エラー処理をここに書く（例：エラーメッセージをユーザーに表示する）
    }

    
  }

	return (
		<div className="w-full mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor={"comment"} className="block mb-2 text-lg font-bold">comment</label>
          <textarea {...register("comment", { required: true })}  rows={8} cols={33} className="border border-gray-200 rounded-md px-4 py-2 w-full"/>
        </div>
        <div className="text-left">
          <Button type={"submit"}>submit</Button>
        </div>
      </form>
    </div>
	)
}

export default CommentForm

