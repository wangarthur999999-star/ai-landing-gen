import { Link } from 'react-router-dom'

const demos = [
  {
    name: 'FinTrack — Personal Finance',
    path: 'swiss',
    style: 'Swiss',
    description: 'AI-powered expense tracking and investment projection app. Clean, professional, trust-building design.',
    tags: ['SaaS', 'Fintech', 'B2C'],
  },
  {
    name: 'CloudForge — DevOps Platform',
    path: 'dark-luxury',
    style: 'Dark Luxury',
    description: 'Infrastructure-as-code platform for cloud provisioning. Premium, exclusive feel for enterprise buyers.',
    tags: ['SaaS', 'DevOps', 'B2B'],
  },
  {
    name: 'PawPal — Pet Services',
    path: 'neo-brutalism',
    style: 'Neo-brutalism',
    description: 'On-demand dog walking app. Bold, playful design that stands out in the consumer space.',
    tags: ['Consumer', 'Marketplace', 'B2C'],
  },
]

export default function Demos() {
  return (
    <div className="min-h-screen bg-bg">
      <nav className="fixed top-0 inset-x-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-serif text-lg font-semibold text-text tracking-tight">
            wanga<span className="text-gold">.</span>dev
          </Link>
          <div className="flex items-center gap-6 text-sm font-mono text-text-dim">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <Link to="/generator" className="hover:text-gold transition-colors">Generator</Link>
            <Link to="/demos" className="text-gold hover:text-gold-dim transition-colors">Demos</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-6">Live Examples</p>
          <h1 className="font-serif text-5xl font-semibold leading-tight mb-4">
            AI-Generated Landing Pages
          </h1>
          <p className="text-text-dim max-w-2xl text-lg leading-relaxed">
            Each page below was generated in under 30 seconds by describing the product and picking a style.
            No human edits. Real HTML/CSS, responsive, zero JavaScript.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <a
              key={demo.path}
              href={`/demo/${demo.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-gold/30 transition-colors"
            >
              <div className="aspect-video bg-bg/50 flex items-center justify-center border-b border-border overflow-hidden">
                <iframe
                  src={`/demo/${demo.path}`}
                  className="w-full h-full scale-[0.25] origin-top-left"
                  style={{ width: '400%', height: '400%' }}
                  sandbox=""
                  title={demo.name}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-semibold text-text">{demo.name}</h3>
                  <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                    {demo.style}
                  </span>
                </div>
                <p className="text-sm text-text-dim mb-3">{demo.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {demo.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono text-text-muted bg-bg border border-border px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <div className="gold-glow rounded-2xl bg-surface gold-border p-12">
            <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">Want One Like This?</p>
            <h2 className="font-serif text-3xl font-semibold mb-4">
              Your product, your style,
              <br />
              <span className="gold-gradient">shipped in 48 hours</span>
            </h2>
            <p className="text-text-dim text-sm leading-relaxed mb-8 max-w-md mx-auto">
              $500-1500 per landing page. 5 distinct design styles. Real HTML/CSS, responsive, animation-ready.
              Revision rounds included.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:arthur.wang.dev@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/25 text-gold font-mono text-sm rounded-lg hover:bg-gold/15 transition-colors"
              >
                arthur.wang.dev@gmail.com
              </a>
              <a
                href="https://contra.com/arthur_10_wang_kstf43x5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-dim font-mono text-sm rounded-lg hover:border-gold/25 hover:text-gold transition-colors"
              >
                Contra Portfolio →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
