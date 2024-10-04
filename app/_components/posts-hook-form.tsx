'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createPost } from '@/utils/actions'
import { useRef, useState } from 'react'

// React Hook Form with Zod Validation
const schema = z.object({
   title: z.string().min(3, { message: 'Title must have at least 3 characters' }).max(10, { message: 'Title must have at most 10 charactares' }),
})

export function PostsHookForm() {
   const ref = useRef<HTMLFormElement>(null)
   const [response, setResponse] = useState<{ id: number; title: string }[]>([])
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
   })
   const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
      const apiResponse = await createPost(data.title)
      setResponse((prevResponse) => [...prevResponse, apiResponse!])
      ref.current?.reset()
      ref.current?.focus()
   }
   return (
      <section>
         <h1>
            React Hook Form <br /> With Zod
         </h1>
         <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
            {errors.title && <p className="error-message">{errors.title.message}</p>}
            <input {...register('title')} />
            <div>
               <button type="submit" disabled={!!Object.keys(errors).length} className={!!Object.keys(errors).length ? 'disabled' : undefined}>
                  Send
               </button>
            </div>
         </form>

         <br />
         <br />
         <h1>New posts</h1>
         {!response.length && <p className="zero-posts">No posts yet</p>}
         <ul className="new-posts">
            {response.map((post) => (
               <li key={post.id}>
                  {post.id} .- {post.title}
               </li>
            ))}
         </ul>
      </section>
   )
}
