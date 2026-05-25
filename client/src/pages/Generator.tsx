import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { DescriptionInput } from '../components/DescriptionInput'
import { StyleSelector } from '../components/StyleSelector'
import { PreviewPanel } from '../components/PreviewPanel'
import { RefineInput } from '../components/RefineInput'
import { DeployButton } from '../components/DeployButton'
import { useGenerate } from '../hooks/useGenerate'

export default function Generator() {
  const [description, setDescription] = useState('')
  const [style, setStyle] = useState<string | null>(null)
  const [refineKey, setRefineKey] = useState(0)

  const { status, html, pageId, error, start, reset } = useGenerate()

  const canGenerate = description.trim().length > 0 && style !== null && status === 'idle'

  const handleGenerate = useCallback(() => {
    if (!canGenerate) return
    start(description, style!)
  }, [canGenerate, description, style, start])

  const handleRefine = useCallback((feedback: string) => {
    if (!pageId) return
    reset()
    start(`${description}\n\nRefinement request: ${feedback}`, style!)
  }, [pageId, description, style, start, reset])

  const handleReset = useCallback(() => {
    reset()
    setRefineKey(k => k + 1)
  }, [reset])

  return (
    <div className="flex h-screen bg-bg">
      {/* Left panel */}
      <div className="w-[480px] min-w-[360px] flex flex-col border-r border-border overflow-y-auto">
        <header className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
          <div>
            <Link to="/" className="text-sm font-semibold text-text hover:text-gold transition-colors">
              wanga<span className="text-gold">.</span>dev
            </Link>
            <p className="text-xs text-text-muted font-mono mt-0.5">
              AI Landing Page Generator
            </p>
          </div>
          {status === 'done' && (
            <button
              onClick={handleReset}
              className="text-xs text-text-dim hover:text-gold font-mono transition-colors"
            >
              + New
            </button>
          )}
        </header>

        <div className="flex-1 px-6 py-4 space-y-6">
          {status === 'idle' && (
            <>
              <DescriptionInput
                value={description}
                onChange={setDescription}
                onSubmit={handleGenerate}
                disabled={status !== 'idle'}
              />
              <StyleSelector
                selected={style}
                onSelect={setStyle}
                disabled={status !== 'idle'}
              />
            </>
          )}

          {(status === 'loading' || status === 'streaming') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gold font-mono">
                <div className="w-3 h-3 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                {status === 'loading' ? 'Connecting to DeepSeek...' : 'Streaming...'}
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-surface rounded animate-pulse" />
                <div className="h-2 bg-surface rounded animate-pulse w-3/4" />
                <div className="h-2 bg-surface rounded animate-pulse w-1/2" />
              </div>
              <div className="text-xs text-text-muted font-mono">
                Style: {style} &middot; {html.length.toLocaleString()} chars
              </div>
            </div>
          )}

          {status === 'done' && pageId && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Page ready — {html.length.toLocaleString()} chars
              </div>

              <RefineInput
                key={refineKey}
                pageId={pageId}
                onRefine={handleRefine}
                disabled={false}
              />

              <DeployButton pageId={pageId} />

              <details className="group">
                <summary className="text-xs text-text-muted font-mono cursor-pointer hover:text-gold transition-colors">
                  Generated HTML source
                </summary>
                <pre className="mt-2 p-3 bg-bg rounded-lg text-xs text-text-muted font-mono overflow-auto max-h-48 border border-border">
                  {html.slice(0, 2000)}{html.length > 2000 ? '\n... (truncated)' : ''}
                </pre>
              </details>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-3">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400 font-mono">{error}</p>
              </div>
              <button
                onClick={handleReset}
                className="text-sm text-text-dim hover:text-gold font-mono transition-colors"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-bg">
        <PreviewPanel html={html} status={status} error={error} />
      </div>
    </div>
  )
}
