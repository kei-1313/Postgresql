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
  email: z.string().email(),
  password: z.string()
});

interface LoginProps {
  variant: string;
  toggleVariant: () => void;
}

const Login:React.FC<LoginProps> = ({variant, toggleVariant}) => {
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //セッションの設定
  },[])

  const form = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: '',
        password: ''
      }
    }
  )

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          
        }

        if (callback?.ok) {
          router.push('/posts')
        }
      })
      .finally(() => setIsLoading(false))
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
      >Login</h1>
      <Form {...form}>
        <form className="w-[600px] mt-10 mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
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
                <Button type="submit" variant="outline" size="lg" className="shadow-xl">Login</Button>
                <div>
                  <span onClick={toggleVariant} className="mt-8 inline-block text-sm font-medium cursor-pointer">Sign up?</span>
                </div>
              </div>
          </div>
        </form>
      </Form>
    </div>
	)
}

export default Login


