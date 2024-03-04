"use client"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Header = () => { 
	return (
		<div className="flex justify-end px-10 mt-5 gap-5">
      <Button onClick={() => signOut({ callbackUrl: '/' })} size="lg">ログアウト</Button>
      <Link href={"/posts/form"} className="inline-block border bg-blue-300 border-blue-300 px-4 py-2 rounded-md text-white">投稿する</Link>
    </div>
	)
}

export default Header

