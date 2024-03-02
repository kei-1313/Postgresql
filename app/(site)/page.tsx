import AuthForm from "./component/AuthForm"

const Home = () => { 
	return (
		<div
    className="
    flex 
    min-h-screen 
    items-center
    justify-center 
    sm:px-6 
    lg:px-8"
  >
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
    </div>
	)
}

export default Home

