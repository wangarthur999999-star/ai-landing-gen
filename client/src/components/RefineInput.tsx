import { useState, type FormEvent } from 'react'

interface Props {
  pageId: string
  onRefine: (feedback: string) => void
  disabled: boolean
}

export function RefineInput({ pageId: _, onRefine, disabled }: Props) {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (feedback.trim().length === 0 || disabled) return
    onRefine(feedback.trim())
    setFeedback('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
        Refine
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="E.g. 'Make the hero headline more urgent' or 'Change the CTA color to green'"
          disabled={disabled}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2
                     text-sm text-zinc-100 placeholder:text-zinc-500 font-mono
                     focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        />
        <button
          type="submit"
          disabled={disabled || feedback.trim().length === 0}
          className="px-4 py-2 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg
                     border border-zinc-700 hover:bg-zinc-700 hover:text-zinc-100
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all"
        >
          Refine
        </button>
      </div>
    </form>
  )
}
