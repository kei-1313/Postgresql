"use client"

import { useCallback, useState } from "react"
import Signup from "./component/Signup"
import Login from "./component/Login";

type Variant = "LOGIN" | "REGISTER";

const Home = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN")

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
      console.log("REGISTER");
    } else {
      setVariant("LOGIN");
      console.log("LOGIN");
    }
  }, [variant])

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
    {variant === "LOGIN"? 
      (
        <Login variant={variant} toggleVariant={toggleVariant}/>
      ):(
        <Signup variant={variant} toggleVariant={toggleVariant}/>
      )
    }
    </div>
    </div>
	)
}

export default Home

