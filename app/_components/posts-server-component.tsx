import { Posts } from './posts'
import { getPosts } from '@/utils/actions'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export async function PostsServerComponent() {
   const queryClient = new QueryClient()
   await queryClient.prefetchInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam }) => getPosts(pageParam),
      initialPageParam: 1, // server component commands
   })
   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <Posts />
      </HydrationBoundary>
   )
}
