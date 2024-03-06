"use client"

import Header from "../component/Header"
import PostList from "../component/posts/PostList"
import { useSession } from "next-auth/react";



const Posts = () => {
  const session = useSession()
  // console.log(session);

	return (
		<div>
      <Header/>
      <PostList />
    </div>
	)
}

export default Posts

