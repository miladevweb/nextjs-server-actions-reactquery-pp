import { Comments } from './comments'
import { getComments } from '@/utils/actions'
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query'

export async function CommentsServerComponent() {
   const queryClient = new QueryClient()
   await queryClient.prefetchQuery({ queryKey: ['comments'], queryFn: getComments })
   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <Comments />
      </HydrationBoundary>
   )
}
