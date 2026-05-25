import { useState, useRef, useCallback } from 'react'
import { generatePage } from '../lib/api'

type Status = 'idle' | 'loading' | 'streaming' | 'done' | 'error'

interface UseGenerateReturn {
  status: Status
  html: string
  pageId: string | null
  error: string | null
  start: (description: string, style: string) => void
  cancel: () => void
  reset: () => void
}

export function useGenerate(): UseGenerateReturn {
  const [status, setStatus] = useState<Status>('idle')
  const [html, setHtml] = useState('')
  const [pageId, setPageId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const start = useCallback((description: string, style: string) => {
    setHtml('')
    setPageId(null)
    setError(null)
    setStatus('loading')

    controllerRef.current = generatePage(
      description,
      style,
      (token: string) => {
        setStatus('streaming')
        setHtml(prev => prev + token)
      },
      (id: string) => {
        setPageId(id)
        setStatus('done')
      },
      (err: string) => {
        setError(err)
        setStatus('error')
      },
    )
  }, [])

  const cancel = useCallback(() => {
    controllerRef.current?.abort()
    setStatus('idle')
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setHtml('')
    setPageId(null)
    setError(null)
  }, [])

  return { status, html, pageId, error, start, cancel, reset }
}
