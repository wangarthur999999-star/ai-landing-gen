import { Link } from 'react-router-dom'

const projects = [
  {
    title: 'SuriOrder',
    tagline: 'AI-Powered Restaurant SaaS',
    description:
      'Full-stack ordering platform with AI menu optimization, QR ordering, and real-time kitchen management. Built with Express, React, and PostgreSQL.',
    tags: ['React', 'Express', 'PostgreSQL', 'AI'],
    href: '/projects/suriorder',
  },
  {
    title: 'mizhi-bot',
    tagline: 'Autonomous Booking Agent',
    description:
      'WhatsApp-based AI booking bot handling reservations, confirmations, and customer inquiries 24/7. Serving real businesses in production.',
    tags: ['WhatsApp API', 'NLP', 'SaaS'],
    href: '/projects/mizhi-bot',
  },
  {
    title: 'Multi-Agent Orchestration',
    tagline: '4-Strategy Agent Framework on DeepSeek',
    description:
      'Custom multi-agent system with group chat, hierarchical, nested chat, and sequential strategies. Open-source with benchmarked results.',
    tags: ['DeepSeek', 'Python', 'Multi-Agent', 'OSS'],
    href: '/projects/multi-agent',
  },
  {
    title: 'MemPalace',
    tagline: 'Persistent AI Memory with Knowledge Graph',
    description:
      'ChromaDB + SQLite knowledge graph powering persistent AI memory across sessions. Semantic search, auto-compression, and contextual recall.',
    tags: ['ChromaDB', 'Python', 'RAG', 'MCP'],
    href: '/projects/mempalace',
  },
  {
    title: '华夏视线电视台 Ad Sales',
    tagline: 'End-to-End TV Ad Lead Pipeline',
    description:
      'Multi-agent lead discovery + SMTP outreach workflow. Automated prospect research, email generation, and campaign tracking for TV ad sales.',
    tags: ['Automation', 'SMTP', 'Lead Gen'],
    href: '/projects/tv-ad-pipeline',
  },
  {
    title: 'AI Landing Page Generator',
    tagline: 'Live Demo — You\'re On The Site',
    description:
      'Describe a product → AI generates a complete landing page with copywriting + design in 30 seconds. 5 design styles, SSE streaming.',
    tags: ['DeepSeek', 'React', 'Express', 'AI'],
    href: '/generator',
    featured: true,
  },
]

const skills = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'Go', 'SQL'] },
  { category: 'AI / ML', items: ['DeepSeek', 'OpenAI', 'RAG', 'Agents', 'ChromaDB', 'LangChain'] },
  { category: 'Frontend', items: ['React 19', 'Next.js', 'Tailwind', 'Vite', 'Playwright'] },
  { category: 'Backend', items: ['Express', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'] },
  { category: 'AI Frameworks', items: ['AutoGen', 'CrewAI', 'Langfuse', 'CopilotKit'] },
  { category: 'DevOps', items: ['GitHub Actions', 'Render', 'VPS', 'Nginx'] },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-serif text-lg font-semibold text-text tracking-tight">
            wanga<span className="text-gold">.</span>dev
          </Link>
          <div className="flex items-center gap-6 text-sm font-mono text-text-dim">
            <a href="#projects" className="hover:text-gold transition-colors">Projects</a>
            <a href="#skills" className="hover:text-gold transition-colors">Skills</a>
            <Link to="/generator" className="text-gold hover:text-gold-dim transition-colors">
              Live Demo →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-6">
            AI Native Developer & Studio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-[1.08] tracking-tight mb-6">
            I build{' '}
            <span className="gold-gradient">AI systems</span>
            <br />
            that replace repetition
          </h1>
          <p className="text-lg text-text-dim max-w-xl leading-relaxed mb-10">
            从内容自动化到多智能体协作，20+项目全部跑在生产环境。不是讲 PPT 的，是把 AI 真正工程化落地的。
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/generator"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold/10 border border-gold/25 text-gold
                         font-mono text-sm rounded-lg hover:bg-gold/15 transition-colors"
            >
              Try Live Demo
              <span className="text-gold-dim">→</span>
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-dim
                         font-mono text-sm rounded-lg hover:border-gold/25 hover:text-gold transition-colors"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="section-line mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '20+', label: 'Projects Shipped' },
              { value: '4yr+', label: 'AI Engineering' },
              { value: '6', label: 'AI Frameworks Mastered' },
              { value: '100%', label: 'Self-Built Stack' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-semibold text-gold mb-1">{stat.value}</p>
                <p className="text-xs text-text-muted font-mono tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="section-line mt-8" />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-3">Portfolio</p>
          <h2 className="font-serif text-4xl font-semibold mb-12">Selected Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
            {projects.map((project) => (
              <Link
                key={project.title}
                to={project.href}
                className="group bg-surface p-6 flex flex-col gap-4 card-hover gold-border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-text mb-0.5">{project.title}</h3>
                    <p className="text-xs text-gold-dim font-mono">{project.tagline}</p>
                  </div>
                  {project.featured && (
                    <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                      LIVE DEMO
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-dim leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-text-muted bg-surface border border-border
                                 px-2 py-0.5 rounded-md group-hover:border-gold/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-3">Stack</p>
          <h2 className="font-serif text-4xl font-semibold mb-12">Technologies</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((group) => (
              <div key={group.category} className="bg-surface gold-border rounded-xl p-5 card-hover">
                <h3 className="font-mono text-xs text-gold-dim tracking-wide uppercase mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-text-dim bg-bg border border-border rounded-md px-2.5 py-1
                                 font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landing Page Demo Showcase */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="section-line mb-12" />
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-3">Live Demos</p>
              <h2 className="font-serif text-4xl font-semibold mb-2">AI-Generated Landing Pages</h2>
              <p className="text-text-dim text-sm">Each page generated in under 30 seconds. No human edits.</p>
            </div>
            <Link
              to="/demos"
              className="font-mono text-sm text-gold hover:text-gold-dim transition-colors"
            >
              View All Demos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { path: 'swiss', style: 'Swiss', name: 'FinTrack', desc: 'Personal finance SaaS app' },
              { path: 'dark-luxury', style: 'Dark Luxury', name: 'CloudForge', desc: 'DevOps infrastructure platform' },
              { path: 'neo-brutalism', style: 'Neo-brutalism', name: 'PawPal', desc: 'On-demand pet services app' },
              { path: 'glassmorphism', style: 'Glassmorphism', name: 'MindPilot', desc: 'Meditation & wellness app' },
              { path: 'editorial', style: 'Editorial', name: 'The Long Read', desc: 'Long-form journalism platform' },
            ].map((demo) => (
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
                    className="w-full h-full scale-[0.2] origin-top-left"
                    style={{ width: '500%', height: '500%' }}
                    sandbox=""
                    title={demo.name}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-text font-serif font-semibold">{demo.name}</p>
                    <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded-full">{demo.style}</span>
                  </div>
                  <p className="text-xs text-text-dim mt-1">{demo.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="gold-glow rounded-2xl bg-surface gold-border p-12">
            <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">Available for Work</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Your landing page,
              <br />
              <span className="gold-gradient">shipped in 48 hours</span>
            </h2>
            <p className="text-text-dim text-sm leading-relaxed mb-8 max-w-md mx-auto">
              $500-1500 fixed price. 5 design styles. Real HTML/CSS, responsive, animation-ready.
              I use AI tooling to deliver at 10x speed — no templates, no page builders.
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

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono">
            © {new Date().getFullYear()} wanga.dev — AI Native Developer Studio
          </p>
          <div className="flex items-center gap-4 text-xs text-text-dim font-mono">
            <a href="https://github.com/wanga-dev" className="hover:text-gold transition-colors">GitHub</a>
            <a href="https://x.com/wanga_dev" className="hover:text-gold transition-colors">X / Twitter</a>
            <Link to="/generator" className="hover:text-gold transition-colors">Live Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
