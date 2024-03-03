"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";



const PostForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>(
    {
      defaultValues: {
        title: '',
        post: '',
      }
    }
  )

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/posts/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) { // HTTPステータスコードが200番台以外の場合、エラーとみなす
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      router.push("/posts")

      // 応答を適切に処理する（例：JSONとして解析する、成功メッセージを表示するなど）
    } catch (error) {
      console.error("An error occurred:", error);
      // エラー処理をここに書く（例：エラーメッセージをユーザーに表示する）
    } finally {
      setIsLoading(false); // エラーがあってもなくても、ローディング状態を解除
    }
  }


	return (
		<div className="max-w-[600px] w-full mx-auto mt-[120px]">
      <h1 className="text-center mb-10 text-[30px] font-bold">Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <label htmlFor={"title"} className="block mb-2">title</label>
          <input {...register("title", { required: true })} type="text" className="border border-gray-200 rounded-md px-4 py-2 w-full"/>
        </div>
        <div className="mb-8">
          <label htmlFor={"post"} className="block mb-2">post</label>
          <textarea {...register("post", { required: true })}  rows={8} cols={33} className="border border-gray-200 rounded-md px-4 py-2 w-full"/>
        </div>
        <div className="text-center">
          <Button type={"submit"}>submit</Button>
        </div>
      </form>
    </div>
	)
}

export default PostForm

