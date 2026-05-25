import { useParams, Link } from 'react-router-dom'

interface ProjectDetail {
  title: string
  tagline: string
  hero: string
  stack: string[]
  highlights: string[]
  link?: string
  linkLabel?: string
}

const projectData: Record<string, ProjectDetail> = {
  suriorder: {
    title: 'SuriOrder',
    tagline: 'AI-Powered Restaurant Ordering Platform',
    hero: 'Full-stack SaaS enabling restaurants to accept QR orders, manage menus with AI optimization, and track real-time kitchen operations. Built for the Surinamese market with multi-language support.',
    stack: ['React 19', 'Express 5', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Playwright', 'QR API'],
    highlights: [
      'AI menu optimization engine suggesting pricing and placement based on order history',
      'Real-time kitchen display system with WebSocket updates',
      'QR code ordering with multi-language support (NL/EN/CN)',
      'Comprehensive E2E test suite with Playwright covering all critical user flows',
      'Role-based access: admin, kitchen staff, waitstaff, customer',
    ],
    link: 'https://github.com/wanga-dev/suriorder',
    linkLabel: 'View on GitHub',
  },
  'mizhi-bot': {
    title: 'mizhi-bot',
    tagline: 'WhatsApp-Based Autonomous Booking Agent',
    hero: 'AI chatbot integrated with WhatsApp Business API handling appointment bookings, confirmations, reminders, and customer inquiries — operating 24/7 for real businesses.',
    stack: ['TypeScript', 'WhatsApp Business API', 'Express', 'Supabase', 'NLP', 'Redis'],
    highlights: [
      'Natural language understanding for booking intents in Chinese and English',
      'Automated confirmation and reminder flows reducing no-shows by 40%',
      'Supabase real-time database for instant booking sync',
      'Rate-limited SMTP integration for email fallback and notifications',
      'Multi-tenant architecture serving multiple business locations',
    ],
    link: 'https://github.com/wanga-dev/mizhi-bot',
    linkLabel: 'View on GitHub',
  },
  'multi-agent': {
    title: 'Multi-Agent Orchestration',
    tagline: '4-Strategy Agent Framework on DeepSeek',
    hero: 'A custom multi-agent orchestration system implementing group chat, hierarchical, nested chat, and sequential strategies. Built on DeepSeek API with benchmarked comparison results.',
    stack: ['Python', 'DeepSeek API', 'asyncio', 'Pydantic', 'Rich CLI'],
    highlights: [
      '4 orchestration strategies: Group Chat, Hierarchical, Nested Chat, Sequential',
      'Benchmarked comparison across 5 task types with quality/speed/cost metrics',
      'Skill-based agent system with role assignment, tool binding, and memory',
      'Streaming output with real-time agent interaction visualization',
      'Open-source with comprehensive README and runnable examples',
    ],
    link: 'https://github.com/wanga-dev/multi-agent-orchestration',
    linkLabel: 'View on GitHub',
  },
  mempalace: {
    title: 'MemPalace',
    tagline: 'Persistent AI Memory with Knowledge Graph',
    hero: 'A memory layer for AI agents combining ChromaDB vector search with SQLite knowledge graphs. Enables persistent, searchable, and self-compressing memory across sessions.',
    stack: ['Python', 'ChromaDB', 'SQLite', 'Sentence Transformers', 'MCP Protocol', 'FastAPI'],
    highlights: [
      'Hybrid search: vector similarity + knowledge graph traversal',
      'Auto-compression: summarizes old memories to maintain context efficiency',
      'MCP server integration for Claude Code and other AI tools',
      'Two wings: OpenSpace (567 files) and Paperclip (2,294 files) knowledge bases',
      'Semantic mining with automatic entity extraction and relationship mapping',
    ],
  },
  'tv-ad-pipeline': {
    title: 'TV Ad Lead Pipeline',
    tagline: 'Multi-Agent Lead Discovery + SMTP Outreach',
    hero: 'Automated lead generation and email outreach system built for 华夏视线电视台 (Huaxia Vision TV). Discovers potential advertisers, researches prospects, and sends personalized outreach at scale.',
    stack: ['Python', 'SMTP', 'Google Workspace', 'Playwright', 'Jinja2', 'Shelve'],
    highlights: [
      'Multi-agent pipeline: discovery agent → research agent → writing agent → sending agent',
      'Automated prospect research scraping company websites and social media',
      'Personalized email generation in Chinese business style with Jinja2 templates',
      'Rate-limited SMTP sending with Gmail (batch size optimization, retry strategy)',
      'Full campaign tracking: sent, opened, replied, converted',
    ],
  },
  'ai-landing-gen': {
    title: 'AI Landing Page Generator',
    tagline: 'This Site\'s Live Demo — AI-Powered Page Generation',
    hero: 'Describe any product in natural language, pick a design style, and get a complete HTML landing page with AI-generated copywriting and design in under 30 seconds. 5 distinct design systems available.',
    stack: ['React 19', 'Express 5', 'TypeScript', 'DeepSeek API', 'Tailwind CSS v4', 'Cheerio', 'Vite'],
    highlights: [
      '5 pre-crafted design templates: Swiss, Dark Luxury, Neo-brutalism, Glassmorphism, Editorial',
      'SSE streaming from DeepSeek API for real-time generation feedback',
      '3-layer defense: structured templates → cheerio validation (2 retries) → error to client',
      'iframe sandbox for safe preview of generated pages',
      'Natural language refinement: describe changes and AI regenerates',
      'Built as a demonstration of "1 person + AI toolchain = 10x delivery speed"',
    ],
    link: '/generator',
    linkLabel: 'Try Live Demo →',
  },
}

export default function Projects() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !projectData[slug]) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted font-mono mb-4">Project not found</p>
          <Link to="/" className="text-gold hover:text-gold-dim font-mono text-sm transition-colors">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    )
  }

  const project = projectData[slug]

  return (
    <div className="min-h-screen bg-bg">
      <nav className="fixed top-0 inset-x-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-serif text-lg font-semibold text-text tracking-tight">
            wanga<span className="text-gold">.</span>dev
          </Link>
          <Link
            to="/"
            className="text-sm text-text-dim hover:text-gold font-mono transition-colors"
          >
            ← Back
          </Link>
        </div>
      </nav>

      <article className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-gold tracking-[0.2em] uppercase mb-4">Case Study</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-3">{project.title}</h1>
          <p className="text-lg text-gold-dim font-mono mb-8">{project.tagline}</p>

          <div className="section-line my-8" />

          <p className="text-text-dim text-lg leading-relaxed mb-10">{project.hero}</p>

          <h2 className="font-serif text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-sm text-gold bg-gold/5 border border-gold/15 rounded-md px-3 py-1.5 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-semibold mb-4">Highlights</h2>
          <ul className="space-y-3 mb-10">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-text-dim">
                <span className="text-gold mt-1.5 shrink-0">▸</span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>

          {project.link && (
            <a
              href={project.link}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold/10 border border-gold/25 text-gold
                         font-mono text-sm rounded-lg hover:bg-gold/15 transition-colors"
            >
              {project.linkLabel || 'View Project'}
              <span className="text-gold-dim">→</span>
            </a>
          )}
        </div>
      </article>

      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-text-muted font-mono">
            © {new Date().getFullYear()} wanga.dev
          </p>
        </div>
      </footer>
    </div>
  )
}
