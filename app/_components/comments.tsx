'use client'
import { getComments } from '@/utils/actions'
import { useQuery } from '@tanstack/react-query'

export function Comments() {
   const { data } = useQuery({ queryKey: ['comments'], queryFn: getComments })
   return (
      <section>
         <h1>Another Asynchrounous Content</h1>
         <ul>
            {data.map((user: any) => (
               <li key={user.id}>
                  {user.id} .- {user.email}
               </li>
            ))}
         </ul>
      </section>
   )
}
