"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const Posts = () => { 
	return (
		<div>
      <div className="flex justify-end px-10 mt-5">
        <Button onClick={() => signOut({ callbackUrl: '/' })} size="lg">ログアウト</Button>
      </div>
      <h1>posts</h1>
    </div>
	)
}

export default Posts

