import { QueryClient, QueryKey } from '@tanstack/react-query'

export const prefetch = <T>(
  queryClient: QueryClient,
  key: QueryKey,
  fn: () => Promise<T>,
) => {
  return queryClient.prefetchQuery({
    queryKey: key,
    queryFn: fn,
  })
}
