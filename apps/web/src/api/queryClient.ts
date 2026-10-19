import { QueryClient } from '@tanstack/react-query'
import { ApiError } from './http'

const MAX_RETRIES = 2
const MAX_RETRY_DELAY_MS = 3000

function shouldRetry(failureCount: number, error: Error): boolean {
  const isClientError = error instanceof ApiError && error.status >= 400 && error.status < 500
  return !isClientError && failureCount < MAX_RETRIES
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      retryDelay: (attempt) => Math.min(500 * 2 ** attempt, MAX_RETRY_DELAY_MS),
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    },
  },
})
