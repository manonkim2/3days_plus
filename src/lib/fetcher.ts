import { toast } from '@/components/useToast'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'

interface IFetcherOptions extends RequestInit {
  query?: Record<string, number | number | string>
  baseUrl?: string
  fallbackErrorMessage?: string
  showToastOnError?: boolean
  cache?: RequestCache
  nextOptions?: {
    revalidate?: number
  }
}

export const fetcher = async <T = unknown>(
  endpoint: string,
  options?: IFetcherOptions,
): Promise<T> => {
  const baseUrl = options?.baseUrl || process.env.NEXT_PUBLIC_SITE_URL
  let finalUrl = `${baseUrl}${endpoint}`

  if (options?.query) {
    const queryString = new URLSearchParams(
      Object.entries(options.query).reduce(
        (acc, [key, val]) => {
          acc[key] = String(val)
          return acc
        },
        {} as Record<string, string>,
      ),
    ).toString()

    finalUrl += `?${queryString}`
  }

  try {
    const res = await fetch(finalUrl, {
      ...options,
      cache: options?.cache || 'default',
      next: options?.nextOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Fetch error: ${res.status} ${errorText}`)
    }
    return res.json()
  } catch (error: unknown) {
    const fallback = options?.fallbackErrorMessage || '문제가 발생했습니다.'
    const message = error instanceof Error ? error.message : fallback

    if (options?.showToastOnError) {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    }

    throw new Error(message)
  }
}
