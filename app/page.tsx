import { Suspense } from 'react'
import { PostsHookForm } from './_components/posts-hook-form'
import { PostsServerComponent } from './_components/posts-server-component'
import { CommentsServerComponent } from './_components/comments-server-component'

export const metadata = {
   title: 'React Query | Server Actions',
}
export default function Page() {
   return (
      <>
         {/* <PostMutation />

         <br />
         <br /> */}

         <section className="main-container">
            <div className="container">
               <div className="infinite">
                  <Suspense fallback={<div className="loading"></div>}>
                     <PostsServerComponent />
                  </Suspense>
               </div>

               <div className="sync">
                  <h1>Synchrounous Content</h1>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis consequatur inventore excepturi magnam sed laudantium ut voluptate beatae id in debitis blanditiis, officia
                     expedita ratione temporibus! Atque repudiandae ullam, recusandae esse quibusdam quam facilis! Dicta voluptatum eos impedit quidem in.
                  </p>
               </div>

               <div className="async">
                  <Suspense fallback={<div className="loading"></div>}>
                     <CommentsServerComponent />
                  </Suspense>
               </div>

               <div className="form">
                  {/* React-Hook-Form with Zod */}
                  <PostsHookForm />
               </div>
            </div>
         </section>
      </>
   )
}
