'use client'
import { useRef } from 'react'
import { createPostWithZod } from '@/utils/actions'
import { useMutation } from '@tanstack/react-query'

export function PostMutation() {
   const ref = useRef<HTMLFormElement>(null)

   const { mutate, isPending, isError, isSuccess, data } = useMutation({
      mutationFn: (params: string[]) => {
         const [title] = params
         return createPostWithZod(title)
      },
      onSuccess: () => {
         ref.current?.reset()
         ref.current?.focus()
      },
   })

   const onSubmit = (e: any) => {
      e.preventDefault()
      const input = e.target[0]
      const title = input.value
      mutate([title])
   }

   return (
      <form ref={ref} onSubmit={onSubmit}>
         {typeof data !== 'string' && <div>{data?.find((error) => error.toLowerCase().includes('title'))}</div>}
         <input type="text" name="title" autoFocus />

         <button type="submit" disabled={isPending || isError}>
            Send
         </button>
         {isError && <div>Something went wrong!!!</div>}
         {isSuccess && <div>Congrats,</div>}
         {typeof data !== 'string' && <div>{data?.find((error) => error.toLowerCase().includes('number'))}</div>}
      </form>
   )
}
