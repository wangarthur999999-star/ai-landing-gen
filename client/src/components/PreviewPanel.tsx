interface Props {
  html: string | null
  status: 'idle' | 'loading' | 'streaming' | 'done' | 'error'
  error: string | null
}

export function PreviewPanel({ html, status, error }: Props) {
  if (status === 'idle') {
    return (
      <div className="h-full flex items-center justify-center text-zinc-600">
        <div className="text-center space-y-3">
          <div className="text-4xl">⟡</div>
          <p className="text-sm font-mono">Describe your product and select a style.<br />The generated page will appear here.</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-3 p-8">
          <div className="text-4xl">⚠</div>
          <p className="text-sm text-red-400 font-mono">{error}</p>
        </div>
      </div>
    )
  }

  if (status === 'loading' && !html) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="inline-block w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-500 font-mono">Generating...</p>
        </div>
      </div>
    )
  }

  return (
    <iframe
      className="w-full h-full border-0"
      sandbox=""
      srcDoc={html || ''}
      title="Landing page preview"
    />
  )
}
