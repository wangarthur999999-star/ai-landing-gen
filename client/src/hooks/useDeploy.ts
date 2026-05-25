import { useState, useCallback } from 'react'
import { deployPage, type DeployResult } from '../lib/api'

interface UseDeployReturn {
  status: 'idle' | 'deploying' | 'success' | 'error'
  result: DeployResult | null
  error: string | null
  deploy: (id: string) => void
}

export function useDeploy(): UseDeployReturn {
  const [status, setStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<DeployResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const deploy = useCallback(async (id: string) => {
    setStatus('deploying')
    setError(null)
    try {
      const res = await deployPage(id)
      setResult(res)
      setStatus(res.status === 'failed' ? 'error' : 'success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deploy failed')
      setStatus('error')
    }
  }, [])

  return { status, result, error, deploy }
}
