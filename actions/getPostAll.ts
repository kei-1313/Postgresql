const getPostAll = async () => {
	try {
		const res = await fetch("/api/posts/")
		const posts = res.json()
		
		return posts
	} catch (error) {
		console.error("Failed fetching", error)
	}
}

export default getPostAll

