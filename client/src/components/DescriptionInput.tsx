import { type FormEvent } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled: boolean
}

const MAX_CHARS = 500

export function DescriptionInput({ value, onChange, onSubmit, disabled }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim().length === 0 || disabled) return
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label
        htmlFor="description"
        className="block text-xs font-medium text-zinc-400 uppercase tracking-wider"
      >
        Product Description
      </label>
      <textarea
        id="description"
        rows={5}
        maxLength={MAX_CHARS}
        placeholder="Describe your product — what it does, who it's for, and the key benefit. Example: 'TaskFlow is a project management tool for remote teams. It combines task tracking, time zones, and async video updates in one dashboard. Unlike Slack + Trello, everything stays in context.'"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3
                   text-sm text-zinc-100 placeholder:text-zinc-500
                   font-mono resize-none
                   focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      />
      <div className="flex items-center justify-between">
        <span className={`text-xs font-mono ${value.length > MAX_CHARS * 0.9 ? 'text-amber-500' : 'text-zinc-600'}`}>
          {value.length}/{MAX_CHARS}
        </span>
        <button
          type="submit"
          disabled={disabled || value.trim().length === 0}
          className="px-6 py-2 bg-amber-500 text-black font-semibold text-sm rounded-lg
                     hover:bg-amber-400 active:scale-[0.98]
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all"
        >
          Generate
        </button>
      </div>
    </form>
  )
}
