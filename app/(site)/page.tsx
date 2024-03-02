import AuthForm from "./component/AuthForm"

const Home = () => { 
	return (
		<div>
      <h1 
        className="
        text-center 
        text-3xl 
        font-bold 
        tracking-tight 
        text-gray-900"
      >ログイン</h1>
      <AuthForm/>
    </div>
	)
}

export default Home

