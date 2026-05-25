interface Props {
  selected: string | null
  onSelect: (style: string) => void
  disabled: boolean
}

const STYLE_OPTIONS = [
  { id: 'swiss', label: 'Swiss', desc: 'Clean grids, bold typography, red accent. Best for SaaS & enterprise.', icon: '▢' },
  { id: 'dark-luxury', label: 'Dark Luxury', desc: 'Deep black, gold accents, Playfair Display. For premium agencies.', icon: '◆' },
  { id: 'neo-brutalism', label: 'Neo-brutalism', desc: 'Hard shadows, loud colors, playful. For creative tools & startups.', icon: '⬡' },
  { id: 'glassmorphism', label: 'Glassmorphism', desc: 'Frosted glass, mesh gradients, rounded. For AI & modern products.', icon: '◉' },
  { id: 'editorial', label: 'Editorial', desc: 'Serif hero, generous spacing, minimal. For content & education.', icon: '▦' },
]

export function StyleSelector({ selected, onSelect, disabled }: Props) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
        Select Style
      </label>
      <div className="grid gap-2">
        {STYLE_OPTIONS.map(style => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            disabled={disabled}
            className={`text-left p-3 rounded-lg border transition-all
              ${selected === style.id
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{style.icon}</span>
              <div>
                <div className={`text-sm font-semibold ${selected === style.id ? 'text-amber-500' : 'text-zinc-200'}`}>
                  {style.label}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{style.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
