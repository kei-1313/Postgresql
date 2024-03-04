import getPostAll from "@/actions/getPostAll";
import Header from "../component/Header"
import PostList from "../component/posts/PostList"



const Posts = async () => {
  // const posts = await getPostAll()
  // console.log(posts);
  // console.log("ddd");
  
	return (
		<div>
      <Header/>
      <PostList />
    </div>
	)
}

export default Posts

