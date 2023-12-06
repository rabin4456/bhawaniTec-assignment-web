import { QueryCache, QueryClient } from '@tanstack/react-query'

const queryCache = new QueryCache()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
  queryCache,
})

export { queryCache, queryClient }
