interface Props {
  message?: string
}

export function LoadingSpinner({ message = 'Generating...' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-10 h-10 border-2 border-zinc-800 rounded-full" />
        <div className="absolute inset-0 w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-sm text-zinc-500 font-mono">{message}</p>
      <div className="space-y-2 w-full max-w-xs">
        <div className="h-3 bg-zinc-800 rounded animate-pulse" />
        <div className="h-3 bg-zinc-800 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/2" />
      </div>
    </div>
  )
}
