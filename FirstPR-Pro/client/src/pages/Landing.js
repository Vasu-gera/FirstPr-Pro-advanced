import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { TypingLine, Terminal } from '../components/Terminal';

/* ─── Reveal-on-scroll hook ─── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

/* ─── Terminal demo lines ─── */
const DEMO_LINES = [
  { prompt: '$', cmd: 'firstpr scan --skills javascript,react' },
  { out: 'Scanning GitHub repositories...',    cls: '' },
  { out: '✓ Connecting to GitHub API',          cls: 'success' },
  { out: '✓ Loading skill graph: [JS] [React]', cls: 'success' },
  { out: '> Filtering "good first issue" labels', cls: 'highlight' },
  { out: '> Ranking by beginner-friendliness',   cls: 'highlight' },
  { out: '─────────────────────────────────────', cls: '' },
  { out: '✔ Found 12 matching issues',           cls: 'success' },
  { out: '✔ Top repos: facebook/react, vuejs/vue, denoland/deno', cls: 'success' },
  { prompt: '$', cmd: 'firstpr open --issue 1' },
  { out: 'Opening issue in browser...', cls: 'warn' },
];

/* ─── Features data ─── */
const FEATURES = [
  {
    icon: '⚡',
    title: 'Smart Matching',
    desc: 'Analyzes your skill stack and finds perfectly matched beginner issues using advanced label parsing.',
    arrow: '→ learn more',
  },
  {
    icon: '🛡️',
    title: 'Beginner Filtered',
    desc: 'Only surfaces issues tagged "good first issue" — curated to be approachable for new contributors.',
    arrow: '→ explore',
  },
  {
    icon: '⚙️',
    title: 'Zero Setup',
    desc: 'No auth, no config. Type your skills and get results in seconds. It just works.',
    arrow: '→ try it',
  },
];

/* ─── Steps data ─── */
const STEPS = [
  { icon: '⌨️', title: 'Enter Skills',   desc: 'Type your tech stack — JS, Python, Rust, anything. We handle the rest.' },
  { icon: '🔍', title: 'Get Matches',    desc: 'Our engine scans thousands of repos and surfaces the most beginner-friendly issues.' },
  { icon: '🚀', title: 'Ship Your PR',   desc: 'Open the issue, fork the repo, and make your first real open source commit.' },
];

const Landing = () => {
  const navigate = useNavigate();
  useReveal();

  const launchApp = () => {
    navigate('/dashboard');
  };

  return (
    <>
      {/* Ambient glows */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      <Navbar onLaunch={launchApp} isDashboard={false} />

      <div className="page-wrapper">

        {/* ════════════════════════════════════
            HERO
            ════════════════════════════════════ */}
        <section className="hero-section" id="hero">
          <div className="container">
            <div className="hero-inner">

              {/* LEFT: Copy */}
              <div className="hero-copy">
                <div className="hero-badge">
                  <span className="badge-dot" />
                  Open Source Contribution Tool
                </div>

                <h1 className="hero-title">
                  SHIP YOUR<br />
                  <span className="glitch" data-text="FIRST PR">FIRST PR</span>
                </h1>

                <p className="hero-sub">
                  Find beginner-friendly GitHub issues in seconds.
                  Stop scrolling. Start contributing.
                </p>

                <TypingLine />

                <div className="hero-ctas">
                  <button
                    id="hero-cta-start"
                    className="btn-neon btn-primary"
                    onClick={launchApp}
                  >
                    &gt; Start Contributing
                  </button>
                  <a
                    id="hero-cta-github"
                    className="btn-neon btn-outline"
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>

              {/* RIGHT: Terminal preview */}
              <div className="hero-visual" style={{ position: 'relative' }}>
                <div className="hero-deco hero-deco-1">SYS:v2.4.1 // ONLINE</div>
                <Terminal
                  title="firstpr-pro — terminal"
                  lines={[
                    { prompt: '$', cmd: 'firstpr scan --skills js,react' },
                    { out: '> connecting to GitHub API...' },
                    { out: '✓ authenticated',                cls: 'success' },
                    { out: '> scanning 50,000+ repos...' },
                    { out: '> filtering beginner labels...' },
                    { out: '✔ 12 issues found',              cls: 'success' },
                    { out: '✔ ranked by beginner score',     cls: 'success' },
                    { prompt: '_', cmd: '' },
                  ]}
                />
                <div className="hero-deco hero-deco-2">LATENCY: 142ms // STATUS: READY</div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FEATURES
            ════════════════════════════════════ */}
        <section id="features" style={{ padding: '6rem 0' }}>
          <div className="container">
            <div className="reveal">
              <div className="section-label">
                <div className="section-label-line" />
                <span className="section-label-text">Core Features</span>
              </div>
              <h2 className="section-title">
                BUILT FOR{' '}
                <span className="accent-pink">HACKERS</span>
                {' '}&{' '}
                <span className="accent-cyan">BUILDERS</span>
              </h2>
              <p className="section-sub">
                Every feature is designed to remove friction and get you contributing faster.
              </p>
            </div>

            <div className="features-grid reveal">
              {FEATURES.map((f, i) => (
                <div key={i} className="feature-card">
                  <span className="feature-num">0{i + 1}</span>
                  <span className="feature-icon">{f.icon}</span>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                  <span className="feature-arrow">{f.arrow}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            HOW IT WORKS
            ════════════════════════════════════ */}
        <section id="how-it-works" className="hiw-section">
          <div className="container">
            <div className="reveal">
              <div className="section-label">
                <div className="section-label-line" />
                <span className="section-label-text">How It Works</span>
              </div>
              <h2 className="section-title">
                THREE STEPS TO YOUR{' '}
                <span className="accent-green">FIRST COMMIT</span>
              </h2>
              <p className="section-sub">
                No complicated setup. No OAuth. No waiting. Just your skills and a GitHub link.
              </p>
            </div>

            <div className="hiw-grid reveal">
              <div className="hiw-connector" />
              {STEPS.map((s, i) => (
                <div key={i} className="hiw-step">
                  <div className="hiw-step-icon">
                    {s.icon}
                    <span className="hiw-step-num">0{i + 1}</span>
                  </div>
                  <h3 className="hiw-step-title">{s.title}</h3>
                  <p className="hiw-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            TERMINAL DEMO
            ════════════════════════════════════ */}
        <section id="demo" className="demo-section">
          <div className="container">
            <div className="demo-inner">
              <div className="demo-terminal reveal">
                <Terminal title="firstpr-pro — live demo" lines={DEMO_LINES} />
              </div>

              <div className="reveal">
                <div className="section-label">
                  <div className="section-label-line" />
                  <span className="section-label-text">Live Demo</span>
                </div>
                <h2 className="section-title">
                  SEE IT IN{' '}
                  <span className="accent-cyan">ACTION</span>
                </h2>
                <p className="section-sub">
                  Watch FirstPR Pro scan repos, match your skills, and surface the perfect issues — all in real-time.
                </p>

                <div className="stat-chips">
                  <div className="stat-chip">
                    <span className="stat-chip-icon">⚡</span>
                    <span className="stat-chip-val green-val">50K+</span>
                    <span className="stat-chip-label">Repos Scanned</span>
                  </div>
                  <div className="stat-chip">
                    <span className="stat-chip-icon">🎯</span>
                    <span className="stat-chip-val cyan-val">12K+</span>
                    <span className="stat-chip-label">Issues Indexed</span>
                  </div>
                  <div className="stat-chip">
                    <span className="stat-chip-icon">🚀</span>
                    <span className="stat-chip-val pink-val">142ms</span>
                    <span className="stat-chip-label">Avg Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FINAL CTA
            ════════════════════════════════════ */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-inner reveal">
              <h2 className="cta-title">
                STOP OVERTHINKING.<br />
                <span className="accent-green">START CONTRIBUTING.</span>
              </h2>
              <p className="cta-sub">
                Your first pull request is one search away.
              </p>
              <div className="cta-buttons">
                <button
                  id="cta-launch-btn"
                  className="btn-neon btn-primary btn-large"
                  onClick={launchApp}
                >
                  &gt; Launch FirstPR Pro
                </button>
                <a
                  id="cta-github-link"
                  className="btn-neon btn-outline btn-large"
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Star on GitHub ★
                </a>
              </div>
              <p className="cta-note">
                <span>Free</span> · No signup · Open source
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FOOTER
            ════════════════════════════════════ */}
        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <span className="footer-logo">[FirstPR Pro]</span>
              <span className="footer-copy">© 2026 FirstPR Pro — Built for the open source community</span>
              <div className="footer-links">
                <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                <a href="#features">Features</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Landing;
