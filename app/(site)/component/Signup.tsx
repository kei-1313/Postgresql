"use client"

//コンポネント
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string()
});

interface signupProps {
  variant: string;
  toggleVariant: () => void;
}

const Signup:React.FC<signupProps> = ({variant, toggleVariant}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //セッションの設定
  },[])

  const form = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        email: '',
        password: ''
      }
    }
  )

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    if(variant === "REGISTER") {
      const res = await fetch("api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      //サインイン
      const registerLogin = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if(registerLogin?.error) {
        console.log(registerLogin?.error);
        console.log("error");
      }

      if(registerLogin?.ok) {
        router.push('/posts')
      }
      setIsLoading(false);
    }
  }

	return (
		<div>
     <h1 
        className="
        text-center 
        text-3xl 
        font-bold 
        tracking-tight 
        text-gray-900"
      >Sign up</h1>
      <Form {...form}>
        <form className="w-[600px] mt-10 mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
        
          <div className="mb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center mt-8">
              <div>
                <Button type="submit" variant="outline" size="lg" className="shadow-xl">Sign up</Button>
                <div>
                  <p onClick={toggleVariant} className="mt-8 inline-block text-sm font-medium cursor-pointer">Login?</p>
                </div>
              </div>
          </div>
        </form>
      </Form>
    </div>
	)
}

export default Signup

