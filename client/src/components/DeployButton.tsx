import { useDeploy } from '../hooks/useDeploy'

interface Props {
  pageId: string
}

export function DeployButton({ pageId }: Props) {
  const { status, result, error, deploy } = useDeploy()

  if (status === 'success' && result) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 font-medium">Deployed</span>
        </div>
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-amber-500 font-mono underline underline-offset-4
                     hover:text-amber-400 transition-colors truncate"
        >
          {result.url}
        </a>
      </div>
    )
  }

  if (status === 'deploying') {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="font-mono">Deploying...</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => deploy(pageId)}
        className="w-full px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg
                   hover:bg-emerald-500 active:scale-[0.98]
                   transition-all"
      >
        Deploy to Render
      </button>
      {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
    </div>
  )
}
