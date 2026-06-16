import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Utility: fade-up on scroll ─────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function FadeUp({ children, className = '', delay = 0 }) {
  const ref = useFadeUp()
  return (
    <div ref={ref} className={`fade-up ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : {}}>
      {children}
    </div>
  )
}

/* ── Hero SVG ────────────────────────────────────────────────────────── */
function HeroSVG() {
  return (
    <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto" aria-hidden="true">
      {/* governance path */}
      <rect x="60" y="60" width="400" height="200" rx="20" stroke="#FF4F00" strokeWidth="1.5" strokeDasharray="6 4" fill="#FFF3E6" fillOpacity="0.4" />
      {/* connectors */}
      <line x1="130" y1="160" x2="195" y2="160" stroke="#5F6C72" strokeWidth="1.5" />
      <line x1="255" y1="160" x2="315" y2="160" stroke="#5F6C72" strokeWidth="1.5" />
      <line x1="375" y1="160" x2="410" y2="160" stroke="#5F6C72" strokeWidth="1.5" />
      <line x1="110" y1="160" x2="110" y2="100" stroke="#5F6C72" strokeWidth="1.5" />
      <line x1="260" y1="160" x2="260" y2="220" stroke="#5F6C72" strokeWidth="1.5" />
      <line x1="390" y1="160" x2="390" y2="100" stroke="#5F6C72" strokeWidth="1.5" />
      {/* app nodes */}
      {[
        { x: 110, y: 160, label: 'CRM' },
        { x: 390, y: 160, label: 'ERP' },
        { x: 110, y: 100, label: 'Slack' },
        { x: 390, y: 100, label: 'Email' },
        { x: 260, y: 220, label: 'Docs' },
      ].map(({ x, y, label }) => (
        <g key={label}>
          <rect x={x - 30} y={y - 18} width="60" height="36" rx="10" fill="white" stroke="#5F6C72" strokeWidth="1" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="11" fill="#5F6C72" fontFamily="Inter, sans-serif" fontWeight="500">{label}</text>
        </g>
      ))}
      {/* AI node – center highlight */}
      <circle cx="260" cy="160" r="38" fill="#FF4F00" />
      <text x="260" y="155" textAnchor="middle" fontSize="14" fill="white" fontFamily="Inter, sans-serif" fontWeight="700">AI</text>
      <text x="260" y="172" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.85)" fontFamily="Inter, sans-serif">governed</text>
      {/* governance label */}
      <text x="260" y="48" textAnchor="middle" fontSize="11" fill="#FF4F00" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.5">GOVERNED INTELLIGENCE</text>
    </svg>
  )
}

/* ── Modal ───────────────────────────────────────────────────────────── */
function Modal({ open, onClose, title }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ email: '', company: '', role: '', goal: '' })

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Form submission:', form)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-z-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-z-paper rounded-2xl shadow-2xl max-w-md w-full p-8 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-z-cadet hover:text-z-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange rounded" aria-label="Close">✕</button>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-z-ink mb-2">You're on the list.</h3>
            <p className="text-z-cadet">We'll be in touch within one business day.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-z-ink mb-1">{title}</h3>
            <p className="text-z-cadet text-sm mb-6">Tell us a bit about where you're headed.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-z-ink mb-1" htmlFor="modal-email">Work email *</label>
                <input id="modal-email" type="email" required className="w-full border border-z-cadet/30 rounded-xl px-4 py-2.5 text-z-ink bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-z-ink mb-1" htmlFor="modal-company">Company *</label>
                <input id="modal-company" type="text" required className="w-full border border-z-cadet/30 rounded-xl px-4 py-2.5 text-z-ink bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-z-ink mb-1" htmlFor="modal-role">Role *</label>
                <input id="modal-role" type="text" required className="w-full border border-z-cadet/30 rounded-xl px-4 py-2.5 text-z-ink bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-z-ink mb-1" htmlFor="modal-goal">What are you trying to achieve? <span className="text-z-cadet font-normal">(optional)</span></label>
                <textarea id="modal-goal" rows={3} className="w-full border border-z-cadet/30 rounded-xl px-4 py-2.5 text-z-ink bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange resize-none" value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} />
              </div>
              <button type="submit" className="bg-z-orange text-white font-700 font-bold rounded-xl px-6 py-3 hover:bg-z-pumpkin transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange focus-visible:ring-offset-2">Submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

/* ── Nav ─────────────────────────────────────────────────────────────── */
function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-shadow duration-300 bg-z-paper/95 backdrop-blur-sm ${scrolled ? 'shadow-md' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="max-w-[1140px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange rounded">
          <ZapierLogo />
          <span className="text-z-cadet text-sm font-medium hidden sm:inline">AI Transformation Solutions</span>
        </a>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-z-ink">
          <a href="#how-it-works" className="hover:text-z-orange transition-colors">How it works</a>
          <a href="#pillars" className="hover:text-z-orange transition-colors">The two pillars</a>
          <a href="#outcomes" className="hover:text-z-orange transition-colors">Outcomes</a>
          <a href="#faq" className="hover:text-z-orange transition-colors">FAQ</a>
        </div>
        <button onClick={() => onCTA('Book a strategy session')} className="hidden md:inline-flex bg-z-orange text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-z-pumpkin transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange focus-visible:ring-offset-2 shrink-0">Book a strategy session</button>
        {/* Mobile hamburger */}
        <button className="md:hidden text-z-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange rounded p-1" aria-label="Toggle menu" onClick={() => setMenuOpen(m => !m)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-z-paper border-t border-z-cadet/20 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-z-orange">How it works</a>
          <a href="#pillars" onClick={() => setMenuOpen(false)} className="hover:text-z-orange">The two pillars</a>
          <a href="#outcomes" onClick={() => setMenuOpen(false)} className="hover:text-z-orange">Outcomes</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:text-z-orange">FAQ</a>
          <button onClick={() => { setMenuOpen(false); onCTA('Book a strategy session') }} className="bg-z-orange text-white font-bold px-5 py-2.5 rounded-xl hover:bg-z-pumpkin transition-colors text-left">Book a strategy session</button>
        </div>
      )}
    </nav>
  )
}

function ZapierLogo() {
  return (
    <svg height="22" viewBox="0 0 80 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Zapier">
      <path d="M0 15.6L8.3 6.4H0.4V3.2H13V6.4L4.7 15.6H13.2V18.8H0V15.6Z" fill="#FF4F00"/>
      <path d="M16 3.2H20V18.8H16V3.2Z" fill="#201515"/>
      <path d="M23 3.2H29.5C33.7 3.2 36.3 5.6 36.3 9.3C36.3 13 33.7 15.4 29.5 15.4H27V18.8H23V3.2ZM29.2 12.2C31.3 12.2 32.3 11.1 32.3 9.3C32.3 7.5 31.3 6.4 29.2 6.4H27V12.2H29.2Z" fill="#201515"/>
      <path d="M38 15.1L40.7 13C41.7 14.4 43.1 15.1 44.6 15.1C45.9 15.1 46.7 14.5 46.7 13.6C46.7 12.7 46.1 12.3 44.1 11.7C41.1 10.8 39.1 9.6 39.1 7.1C39.1 4.7 41.1 3 44 3C46.2 3 48 3.9 49.3 5.5L46.8 7.5C45.9 6.5 44.9 6 43.9 6C42.7 6 42.1 6.6 42.1 7.3C42.1 8.1 42.7 8.5 44.7 9.1C47.8 10.1 49.8 11.3 49.8 13.7C49.8 16.3 47.7 18.1 44.5 18.1C42 18.1 39.8 17 38 15.1Z" fill="#201515"/>
      <path d="M51 3.2H55.2L58.4 13.5L61.6 3.2H65.8L60.4 18.8H56.4L51 3.2Z" fill="#201515"/>
      <path d="M67 3.2H79V6.4H71V9.4H78V12.6H71V15.6H79.2V18.8H67V3.2Z" fill="#201515"/>
      <path d="M81.2 3.2H88.2C90.8 3.2 92.8 4 94 5.4C94.9 6.4 95.4 7.7 95.4 9.2C95.4 11.8 94 13.7 91.7 14.5L96 18.8H91.5L87.7 15H85.2V18.8H81.2V3.2ZM88 12C89.9 12 91 11 91 9.3C91 7.6 89.9 6.5 88 6.5H85.2V12H88Z" fill="#201515"/>
    </svg>
  )
}

/* ── Sections ────────────────────────────────────────────────────────── */

function Hero({ onCTA }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-z-paper">
      <div className="max-w-[1140px] mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <FadeUp>
            <span className="inline-block bg-z-orange/10 text-z-orange text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">New · Zapier for Enterprise</span>
          </FadeUp>
          <FadeUp delay={80}>
            <h1 className="text-[clamp(36px,5vw,64px)] font-extrabold text-z-ink leading-[1.05] mb-6">
              Zapier AI Transformation Solution
            </h1>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="text-lg text-z-cadet leading-relaxed mb-8 max-w-2xl mx-auto">
              Our AI Transformation Solution pairs hands-on enablement with embedded product experts, so your teams turn AI from pilots into governed, ROI driven workflows running on the apps you already use.
            </p>
          </FadeUp>
          <FadeUp delay={240}>
            <div className="flex flex-wrap gap-3 justify-center mb-5">
              <button onClick={() => onCTA('Book a strategy session')} className="bg-z-orange text-white font-bold px-7 py-3.5 rounded-xl hover:bg-z-pumpkin transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-z-orange focus-visible:ring-offset-2 text-base">
                Book a strategy session
              </button>
              <button onClick={() => onCTA('Request a free AI ZapierCamp')} className="border-2 border-z-ink text-z-ink font-bold px-7 py-3.5 rounded-xl hover:bg-z-ink hover:text-z-paper transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-z-ink focus-visible:ring-offset-2 text-base">
                Request a free AI ZapierCamp
              </button>
            </div>
            <p className="text-sm text-z-cadet">Built on the most connected AI orchestration platform · 9,000+ apps · Enterprise-grade governance</p>
          </FadeUp>
        </div>
        <FadeUp delay={320}>
          <HeroSVG />
        </FadeUp>
      </div>
    </section>
  )
}

function Problem() {
  const stats = [
    { num: '78%', label: 'of enterprises struggle to integrate AI into their core operations' },
    { num: '~10%', label: 'of people can fully self-serve their way to real AI value' },
    { num: '84%', label: 'of execs expect clear AI ROI by 2026 — the clock is ticking' },
  ]
  return (
    <section className="py-20 px-6 bg-z-cream">
      <div className="max-w-[1140px] mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-z-ink mb-4 leading-tight">Most enterprise AI stalls after the pilot.</h2>
          <p className="text-z-cadet text-lg max-w-2xl mb-12 leading-relaxed">
            The tools are ready. The teams aren't. Only ~10% of people can self-serve their way to real value — the other 90% need structured guidance, prioritized use cases, and someone to build alongside them. Without that, pilots pile up and ROI never shows.
          </p>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map(({ num, label }, i) => (
            <FadeUp key={num} delay={i * 100}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-z-cadet/10">
                <div className="text-[48px] font-extrabold text-z-orange leading-none mb-3">{num}</div>
                <p className="text-z-cadet text-sm leading-snug">{label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <p className="text-xs text-z-cadet mt-4">Sources: Zapier "AI at Work" survey; Kurios field research; Future of AI Transformation 2026</p>
      </div>
    </section>
  )
}

function Pillars({ onCTA }) {
  const steps = ['Foundations', 'Scoping', 'Prototype', 'Deploy & Scale']
  const stepDesc = [
    'How to apply AI to your critical operations.',
    'Identify high-impact use cases and ROI, with your teams.',
    'Build prioritized use cases live on Zapier. Show value.',
    'Refine, then enable the rest of the org.',
  ]
  return (
    <section id="pillars" className="py-20 px-6 bg-z-paper">
      <div className="max-w-[1140px] mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-z-ink mb-2 leading-tight">One offer. Two pillars. Real outcomes.</h2>
          <p className="text-z-cadet text-lg mb-12">We meet you where the work happens — building with your teams, then enabling them to run without us.</p>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Pillar A */}
          <FadeUp delay={0}>
            <div className="bg-z-cream rounded-2xl p-8 border border-z-orange/20 h-full flex flex-col">
              <div className="inline-block border border-z-orange text-z-orange text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">Enablement</div>
              <h3 className="text-2xl font-bold text-z-ink mb-2">AI ZapierCamp</h3>
              <p className="text-z-cadet mb-6 leading-relaxed">Cohort-based working sessions that move from understanding to live workflows — fast.</p>
              <div className="mt-auto">
                <div className="flex flex-col gap-3">
                  {steps.map((step, i) => (
                    <div key={step} className="flex gap-3 items-start">
                      <div className="shrink-0 w-7 h-7 rounded-full bg-z-orange text-white text-xs font-bold flex items-center justify-center">{i + 1}</div>
                      <div>
                        <div className="font-semibold text-z-ink text-sm">{step}</div>
                        <div className="text-z-cadet text-xs">{stepDesc[i]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
          {/* Pillar B */}
          <FadeUp delay={120}>
            <div className="bg-z-ink rounded-2xl p-8 border border-z-cadet/20 h-full flex flex-col">
              <div className="inline-block border border-z-teal text-z-teal text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">Embedded delivery</div>
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise AI Deployed PMs</h3>
              <p className="text-white/70 mb-6 leading-relaxed">Embedded PMs who turn ambiguity into shipped use cases — implementing hands-on, proving ROI, and surfacing the next opportunities so value compounds.</p>
              <div className="mt-auto flex flex-col gap-3">
                {['Hands-on implementation', 'Proof of ROI', 'New use cases for expansion', 'Adoption + enablement that sticks'].map(item => (
                  <div key={item} className="flex gap-3 items-center">
                    <svg className="shrink-0 text-z-teal" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="#13D0AB" fillOpacity="0.2"/><path d="M5 9l3 3 5-5" stroke="#13D0AB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
        {/* Flywheel strip */}
        <FadeUp delay={200}>
          <div className="bg-z-orange/8 border border-z-orange/20 rounded-2xl px-8 py-5 text-center text-sm text-z-ink font-medium">
            <span className="text-z-orange font-bold">Services</span> surface use cases → use cases drive <span className="text-z-orange font-bold">expansion</span> and product → a sharper platform makes the <span className="text-z-orange font-bold">next build faster</span>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { range: 'Weeks 0–2', label: 'Diagnose', desc: 'Align on vision, map use cases, set the ROI thesis with your leaders.' },
    { range: 'Weeks 2–4', label: 'Prioritize', desc: 'Pick 3–5 highest-value use cases where Zapier wins.' },
    { range: 'Weeks 4–8', label: 'Build the lighthouse', desc: 'Ship 1–2 live, cross-functional workflows. Show value.' },
    { range: 'Weeks 8–12', label: 'Enable & scale', desc: 'Train power users, set guardrails, plan the rollout.' },
  ]
  return (
    <section id="how-it-works" className="py-20 px-6 bg-z-cream">
      <div className="max-w-[1140px] mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-z-ink mb-12 leading-tight">From mandate to measurable ROI in 90 days.</h2>
        </FadeUp>
        {/* Desktop horizontal / mobile vertical */}
        <div className="grid sm:grid-cols-4 gap-6">
          {steps.map(({ range, label, desc }, i) => (
            <FadeUp key={label} delay={i * 90}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-full w-full h-0.5 bg-z-orange/30 -translate-y-1/2 z-0" style={{ width: 'calc(100% - 20px)', left: 'calc(50% + 20px)' }} />
                )}
                <div className="relative z-10 bg-white rounded-2xl p-6 border border-z-cadet/10 shadow-sm h-full">
                  <div className="w-10 h-10 rounded-full bg-z-orange text-white font-bold flex items-center justify-center text-sm mb-4">{i + 1}</div>
                  <div className="text-xs text-z-orange font-semibold uppercase tracking-wide mb-1">{range}</div>
                  <div className="font-bold text-z-ink mb-2">{label}</div>
                  <p className="text-z-cadet text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyZapier() {
  const tiles = [
    { icon: '🔗', title: '9,000+ apps', desc: 'Automate across the systems you already run — without ripping anything out.' },
    { icon: '🛡️', title: 'Governed intelligence', desc: 'AI as a governed component inside dependable workflows. Agents, MCP, SDK — built-in.' },
    { icon: '👥', title: 'Built for non-technical teams', desc: 'Marketing, Sales, Ops, HR, Finance, Support — not just engineering.' },
    { icon: '🔒', title: 'Enterprise controls', desc: 'App access, action restrictions, managed connections, and bring-your-own model.' },
  ]
  return (
    <section className="py-20 px-6 bg-z-paper">
      <div className="max-w-[1140px] mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-z-ink mb-12 leading-tight">Why this works on Zapier.</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map(({ icon, title, desc }, i) => (
            <FadeUp key={title} delay={i * 80}>
              <div className="bg-z-cream rounded-2xl p-6 border border-z-cadet/10 h-full">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-z-ink mb-2">{title}</h3>
                <p className="text-z-cadet text-sm leading-relaxed">{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Outcomes({ onCTA }) {
  return (
    <section id="outcomes" className="py-20 px-6 bg-z-ink">
      <div className="max-w-[1140px] mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-white mb-3 leading-tight">Designed for 5x+ return on what you invest.</h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl">We frame the ROI, build to it, and measure it — usage, value, and quality — so the business case is never in doubt.</p>
        </FadeUp>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { num: '5x+', label: 'Target ROI', color: 'text-z-sunglow' },
            { num: '90', label: 'Days to first lighthouse workflow', color: 'text-z-teal' },
            { num: '100%', label: 'Company-wide adoption path built in', color: 'text-z-blue' },
          ].map(({ num, label, color }, i) => (
            <FadeUp key={label} delay={i * 100}>
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className={`text-[52px] font-extrabold leading-none mb-3 ${color}`}>{num}</div>
                <p className="text-white/70 text-sm">{label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  const logos = ['Salesforce', 'Workday', 'ServiceNow', 'HubSpot', 'Zendesk']
  return (
    <section className="py-16 px-6 bg-z-paper border-y border-z-cadet/10">
      <div className="max-w-[1140px] mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(22px,2.5vw,32px)] font-bold text-z-ink mb-10 text-center">Trusted by teams that take transformation seriously.</h2>
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            {logos.map(name => (
              <div key={name} className="bg-z-cream border border-z-cadet/15 rounded-xl px-8 py-4 text-z-cadet font-semibold text-sm">{name}</div>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="max-w-2xl mx-auto bg-z-cream rounded-2xl p-8 border border-z-cadet/10 text-center shadow-sm">
            <p className="text-z-ink text-lg font-medium leading-relaxed mb-4">"This wasn't training. It was transformation. Our ops team shipped three production-grade Zapier workflows in the first month — things that would have taken engineering six months to scope."</p>
            <p className="text-z-cadet text-sm font-semibold">— VP of Operations · Global SaaS Company</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Is this training or implementation?', a: 'Both, and more. This is embedded delivery led by product experts, with AI ZapierCamp as the enablement vehicle. You\'re not just learning — you\'re shipping.' },
    { q: 'Who is it for?', a: 'Enterprises with an active AI mandate, especially in SaaS-native and professional-services organizations. If you\'re building an AI Center of Excellence or trying to prove ROI across business units, this is designed for you.' },
    { q: 'How fast can we start?', a: 'We start with a free, time-boxed AI ZapierCamp to prove value — typically within 2–4 weeks of kickoff. Paid deployment follows once you\'ve seen the results firsthand.' },
    { q: 'Do we need engineers?', a: 'No. The engagement is built for non-technical teams. Marketing, Ops, HR, Finance, Sales — they\'re the builders. Engineers join only for complex edge cases or systems integrations.' },
  ]
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" className="py-20 px-6 bg-z-cream">
      <div className="max-w-[1140px] mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold text-z-ink mb-10 leading-tight">Common questions.</h2>
        </FadeUp>
        <div className="max-w-3xl flex flex-col gap-3">
          {items.map(({ q, a }, i) => (
            <FadeUp key={q} delay={i * 60}>
              <div className="bg-white rounded-2xl border border-z-cadet/10 overflow-hidden shadow-sm">
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-z-ink hover:text-z-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-z-orange"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{q}</span>
                  <svg className={`shrink-0 ml-4 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                {open === i && <div className="px-6 pb-5 text-z-cadet text-sm leading-relaxed">{a}</div>}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA({ onCTA }) {
  return (
    <section className="py-24 px-6 bg-z-orange text-center">
      <div className="max-w-[1140px] mx-auto">
        <FadeUp>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-white mb-3 leading-tight">Make AI work for everyone<br className="hidden sm:block" /> in your enterprise.</h2>
          <p className="text-white/80 text-lg mb-10">Start with a strategy session — or a free AI ZapierCamp.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onCTA('Book a strategy session')} className="bg-white text-z-orange font-bold px-8 py-4 rounded-xl hover:bg-z-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-z-orange text-base">
              Book a strategy session
            </button>
            <button onClick={() => onCTA('Request a free AI ZapierCamp')} className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-z-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-z-orange text-base">
              Request a free AI ZapierCamp
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-z-ink text-white/50 py-10 px-6">
      <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <svg height="18" viewBox="0 0 80 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 15.6L8.3 6.4H0.4V3.2H13V6.4L4.7 15.6H13.2V18.8H0V15.6Z" fill="#FF4F00"/>
            <path d="M16 3.2H20V18.8H16V3.2Z" fill="white" fillOpacity="0.7"/>
            <path d="M23 3.2H29.5C33.7 3.2 36.3 5.6 36.3 9.3C36.3 13 33.7 15.4 29.5 15.4H27V18.8H23V3.2ZM29.2 12.2C31.3 12.2 32.3 11.1 32.3 9.3C32.3 7.5 31.3 6.4 29.2 6.4H27V12.2H29.2Z" fill="white" fillOpacity="0.7"/>
            <path d="M38 15.1L40.7 13C41.7 14.4 43.1 15.1 44.6 15.1C45.9 15.1 46.7 14.5 46.7 13.6C46.7 12.7 46.1 12.3 44.1 11.7C41.1 10.8 39.1 9.6 39.1 7.1C39.1 4.7 41.1 3 44 3C46.2 3 48 3.9 49.3 5.5L46.8 7.5C45.9 6.5 44.9 6 43.9 6C42.7 6 42.1 6.6 42.1 7.3C42.1 8.1 42.7 8.5 44.7 9.1C47.8 10.1 49.8 11.3 49.8 13.7C49.8 16.3 47.7 18.1 44.5 18.1C42 18.1 39.8 17 38 15.1Z" fill="white" fillOpacity="0.7"/>
            <path d="M51 3.2H55.2L58.4 13.5L61.6 3.2H65.8L60.4 18.8H56.4L51 3.2Z" fill="white" fillOpacity="0.7"/>
            <path d="M67 3.2H79V6.4H71V9.4H78V12.6H71V15.6H79.2V18.8H67V3.2Z" fill="white" fillOpacity="0.7"/>
          </svg>
          <span className="text-white/60">AI Transformation Services — concept</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white/80 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/80 transition-colors">Contact</a>
        </div>
        <p className="text-xs text-white/35 text-center sm:text-right">Concept page for discussion.<br />Not an official Zapier offering.</p>
      </div>
    </footer>
  )
}

/* ── Root App ────────────────────────────────────────────────────────── */
export default function App() {
  const [modal, setModal] = useState(null)

  return (
    <>
      <Nav onCTA={setModal} />
      <main>
        <Hero onCTA={setModal} />
        <Pillars onCTA={setModal} />
        <Problem />
        <HowItWorks />
        <WhyZapier />
        <Outcomes onCTA={setModal} />
        <SocialProof />
        <FAQ />
        <FinalCTA onCTA={setModal} />
      </main>
      <Footer />
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal || ''} />
    </>
  )
}
