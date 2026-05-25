# Upwork — Active Listings & Proposal Templates

> **Live Demo:** https://dry-walrus-74.loca.lt
> localtunnel free tier — if tunnel dies: `cd ai-landing-gen && npx localtunnel --port 3001`
> **Better:** Deploy to Render for a permanent URL. `render.yaml` is ready.

## LIVE Project Catalog (Zero Connects — Published May 25)

**Public URL:** https://www.upwork.com/services/product/development-it-an-ai-powered-landing-page-in-5-styles-delivered-in-48h-2058946653695900705

- **Title:** You will get an AI-powered landing page in 5 styles, delivered in 48h
- **Status:** Approved, visible to clients
- **Pricing:** $197 / $397 / $597 (3 tiers)
- **Cost to publish:** $0 (Project Catalog requires zero Connects)

## Connects Status

**You have 0 Connects.** Each proposal costs 15-25 Connects. Project Catalog bypasses this.
- **Freelancer Plus** ($14.99/mo): 80 Connects/month + visible bid ranges + client info
- Or buy 100 Connects (~$15) directly
- **Need minimum ~80 Connects** for 4 proposals
- **Still needed** to bid on job posts (Project Catalog is passive — clients come to you)

## Top Jobs Found LIVE via API (May 25, ~10:50 AM CST)

| # | Job | Budget | Proposals | ID |
|---|-----|--------|-----------|-----|
| 1 | **Claude / MCP Engineer — Production Agent Skills + Custom MCP Servers** | $40-80/hr | 20-50 | `~022058876378513543550` |
| 2 | Custom AI with LLM API Integration | $20-50/hr | 20-50 | `~022058884907290244466` |
| 3 | Build AI CV Screening SaaS (Claude API + Next.js) | $1500 fixed | 20-50 | `~022058856849685058029` |
| 4 | Full Stack AI Automation Developer | $10 fixed? | **<5** | `~022058908931679415323` |
| 5 | Senior AI Backend Engineer (Python/LLM) | $30-50/hr | 50+ | `~022058852695026002971` |
| 6 | AI Automation Expert — Festival Content System | $30-60/hr | 50+ | `~022058850417909576617` |

**Skip:** AI Chatbot Setup ($50 fixed, too cheap), AI Full Stack Automation ($5-15/hr, too cheap), RAG Architect ($18K but 50+ proposals as new profile), Fractional CTO ($60-100/hr, needs track record)

### Job #1 Detail: Claude / MCP Engineer
**Client:** US, 17 hires, $4.4K spent, 4.26 rating
**Description:** "We are building internal agentic workflows on Claude (Claude Code + Anthropic API + custom MCP servers) and need a senior operator who is actually shipping in this stack today, not someone who has 'read the docs.'"
**They want:**
- 2-3 custom MCP servers
- 4-6 Agent Skills for repeatable workflows
- Production agent pipeline using Claude Code as build loop
- Cost tracking + per-call observability + replayable decision traces
- Guardrails: scope tokens, attenuated child grants, capability-based delegation
**They explicitly reject:** Generic "LLM developers", LangChain defaults, chat-only Claude users.
**Arthur's edge:** gstack is 53 Claude Code skills. MemPalace is knowledge graph + MCP. graphify is another MCP tool. This job is literally what Arthur's toolchain does.

### Job #3 Detail: Build AI CV Screening SaaS
**Client:** UK, new client (0 hires), payment unverified
**Description:** Full spec provided — Next.js 14, Supabase, Claude API, Stripe
**Budget:** $1500 fixed (30% upfront = $450)
**Arthur's edge:** This is the exact stack from ai-landing-gen (React/TypeScript/Claude API). Quick delivery possible.

## Priority Proposal: Claude / MCP Engineer

**Use this proposal FIRST.** Custom-written for this exact job. Do NOT use generic template.

---

Hey,

I'll be direct: I ship MCP servers. I use Claude Code as my primary development environment — not a curiosity, my daily driver for the last 3 months.

My stack:
- **gstack**: 53 Claude Code Agent Skills covering review, QA, ship, design, architecture, debugging. Each skill wraps domain-specific tool layers.
- **MemPalace**: MCP server backed by ChromaDB + SQLite knowledge graph. Capability-based memory with attenuated grants between agents.
- **graphify**: MCP tool that transforms any input into knowledge graph nodes.
- **mizhi-bot**: Multi-agent pipeline (WhatsApp + Telegram) with 225 tests, production since February. Claude API + LangFuse observability for per-call tracing.

On MCP tool layer design — the question you asked in the post:
I put domain logic in tool descriptions for discoverability, constraints in the system prompt for enforcement, and business rules in the orchestrator. Tool descriptions are the API contract. System prompts are guardrails. The orchestrator owns the decision graph. Mixing those layers is how you get opaque agent behavior and silent failures.

I also built an AI Landing Page Generator (Claude/DeepSeek API → production HTML/CSS in <2 min) with SSE streaming + 3-layer defense (structured templates → cheerio validation → error to client). Live demo at the link on my profile.

Rate: $60/hr. I use Claude Code 4-6 hours daily, MCP servers are core to how I build.

Walk me through one of your workflows and I'll show you where the MCP tool layer would live.

-- Arthur

---

## Strategy (Updated May 25)

1. **BUY CONNECTS FIRST** — You have 0 Connects. Freelancer Plus ($14.99/mo) or ~100 Connects ($15). Non-negotiable before any bids.
2. **Bid on #1 (Claude/MCP) immediately** — This job was written for your exact profile. Use the custom proposal above. It's 8 minutes old, has 20-50 proposals already.
3. **Bid on #2 (Custom AI LLM API)** — Use Template 3 (AI Integration). $20-50/hr, Claude/OpenAI API + React/Next.js.
4. **Bid on #3 (CV Screening SaaS)** — $1500 fixed. The spec uses Claude API + Next.js + Supabase. Direct skill match.
5. **Bid on #6 (Festival AI Automation)** — $30-60/hr, high-quality client (120 hires, $193K spent, 4.98 rating). Long-term potential.
6. **Send 4 great proposals, not 10 generic ones.** Quality over quantity with a new profile.

## Proposal Speed Tips

- New jobs (< 1 hour old, < 10 proposals) → bid immediately
- Each proposal = 2-3 minutes using the templates below
- Respond to messages within 1 hour (set phone notifications)
- First 3 jobs: price $200-500 fixed or $30-50/hr, deliver fast, get 5 stars

---

## Template 1 -- Landing Page / Frontend Project

Hey [CLIENT_NAME],

Saw your post looking for a landing page for [PROJECT/COMPANY]. I just shipped an AI Landing Page Generator that takes a prompt and spits out a production-ready page in under 2 minutes -- five distinct styles (Glassmorphism, Neo-brutalism, Dark Luxury, Minimal Swiss, Editorial), all responsive, all animated, all real code. Not templates. Real TypeScript + Tailwind, component-based, compositor-friendly motion.

Here's what that means for you: I can deliver your page in 48 hours instead of the usual 3-5 days. Not because I rush. Because my toolchain eliminates the boilerplate grind so I spend time on what matters -- your typography pairings, your color system, your visual hierarchy.

I bill at $120/hr normally, but I'm picking up my first few Upwork projects at a lower rate to build reputation here. Happy to quote a flat project price if you prefer.

Shoot me a message with your brief or any references you like. I'll send back a rough direction within a few hours.

-- Arthur

---

## Template 2 -- Bug Fix / Debugging Project

Hey [CLIENT_NAME],

I noticed you're dealing with [BUG/DESCRIPTION]. These kinds of issues -- the ones that survive the first few attempts -- are usually not about the bug itself but about what's hiding behind it: a race condition, a mismatched type assumption, a state update that fires at the wrong tick.

I debug systematically. Start with a reproduction, trace the call stack, isolate the layer where things diverge, fix only that layer, then verify nothing else shifted. I built a multi-agent code review pipeline that catches regressions before they land -- I bring the same rigor to untangling other people's code.

Turnaround: most bugs I resolve within 24 hours. If it takes longer, I'll tell you why within the first few hours and you can decide whether to continue.

I bill $120/hr but I'm discounting my first few Upwork projects to get reviews on the platform. Happy to cap hours if you want a ceiling.

Send me the stack, the symptoms, and what you've already tried. I'll get back to you with a diagnosis plan.

-- Arthur

---

## Template 3 -- AI Integration Project

Hey [CLIENT_NAME],

Your post about [AI_FEATURE/INTEGRATION] caught my eye. I spend most of my time at the intersection of AI and shipping product -- I've built a 24x7 autonomous AI scheduler, an LLM observability pipeline (think Datadog for AI calls), and a prompt-to-landing-page generator that handles the full stack from Claude API to production deploy.

I work with Claude API, LangChain, multi-agent orchestration, and the usual full-stack tooling (TypeScript, React, Node, Python). More importantly, I think in terms of user-facing behavior, not model specs. Your users don't care about your embedding strategy. They care whether the thing works, feels fast, and handles edge cases without face-planting.

If you have a clear spec, I can give you a fixed price. If it's still taking shape, we start with a small paid spike to derisk the unknowns, then commit to the full build.

I bill $120/hr standard but I'm bidding lower on my first few Upwork projects. Let's hop on a quick call and I'll tell you honestly whether I'm the right person for this.

-- Arthur
