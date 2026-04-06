import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { TypingLine, Terminal } from '../components/Terminal';
import IssueCard from '../components/IssueCard';

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

/* ─── Common Skills Data ─── */
const SKILLS_DATA = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "Ruby",
  "React", "Vue", "Angular", "Svelte", "Next.js", "Express", "FastAPI", "Django", "Flask", "Spring",
  "Node.js", "Docker", "Kubernetes", "AWS", "Firebase", "PostgreSQL", "MongoDB", "Redis", "MySQL",
  "HTML", "CSS", "TailwindCSS", "Sass", "Redux", "GraphQL", "TensorFlow", "PyTorch", "OpenCV",
  "Scikit-learn", "Unity", "Unreal Engine", "Figma", "WebAssembly", "Bash", "Shell"
];

/* ─── Click Outside Hook ─── */
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

/* ─── CJK safety filter (frontend fallback) ─── */
const containsCJK = (text = '') => {
  for (let i = 0; i < text.length; i++) {
    const cp = text.codePointAt(i);
    if (
      (cp >= 0x2E80 && cp <= 0x2EFF) ||
      (cp >= 0x3000 && cp <= 0x303F) ||
      (cp >= 0x3040 && cp <= 0x309F) ||
      (cp >= 0x30A0 && cp <= 0x30FF) ||
      (cp >= 0x3400 && cp <= 0x4DBF) ||
      (cp >= 0x4E00 && cp <= 0x9FFF) ||
      (cp >= 0xAC00 && cp <= 0xD7AF) ||
      (cp >= 0xF900 && cp <= 0xFAFF)
    ) return true;
  }
  return false;
};
const isEnglishIssue = (issue) =>
  !containsCJK(issue.title || '') && !containsCJK(issue.repo || '');

/* ════════════════════════════════════════════ */

const Home = () => {
  const [skills, setSkills]   = useState('');
  const [issues, setIssues]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [searched, setSearched] = useState(false);
  
  // Autocomplete state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  
  const appRef = useRef(null);
  const suggestionRef = useRef(null);
  
  useClickOutside(suggestionRef, () => setShowSuggestions(false));
  useReveal();

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => appRef.current?.querySelector('input')?.focus(), 500);
  };

  const findIssues = async (overrideSkills) => {
    const query = overrideSkills || skills;
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    setShowSuggestions(false);
    try {
      const res = await fetch(`http://localhost:8000/issues?skills=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      const englishOnly = Array.isArray(data) ? data.filter(isEnglishIssue) : [];
      setIssues(englishOnly);
    } catch (err) {
      setError(err.message);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSkills(val);
    
    // Get the part being typed (last skill after comma)
    const lastCommaIndex = val.lastIndexOf(',');
    const currentPart = (lastCommaIndex === -1 ? val : val.substring(lastCommaIndex + 1)).trim().toLowerCase();
    
    if (currentPart.length >= 1) {
      const matches = SKILLS_DATA.filter(s => s.toLowerCase().startsWith(currentPart) && !val.toLowerCase().includes(s.toLowerCase()));
      setFilteredSuggestions(matches);
      setShowSuggestions(matches.length > 0);
      setSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (skill) => {
    const lastCommaIndex = skills.lastIndexOf(',');
    const base = lastCommaIndex === -1 ? '' : skills.substring(0, lastCommaIndex + 1).trim() + ' ';
    const newVal = base + skill + ', ';
    setSkills(newVal);
    setShowSuggestions(false);
    // Focus back on input
    appRef.current?.querySelector('input')?.focus();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      if (showSuggestions && filteredSuggestions[suggestionIndex]) {
        selectSuggestion(filteredSuggestions[suggestionIndex]);
      } else {
        findIssues();
      }
    } else if (e.key === 'ArrowDown') {
      if (showSuggestions) {
        e.preventDefault();
        setSuggestionIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
      }
    } else if (e.key === 'ArrowUp') {
      if (showSuggestions) {
        e.preventDefault();
        setSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="skel-bar skel-w40" style={{ marginBottom: '0.8rem' }} />
      <div className="skel-bar skel-w90" style={{ marginBottom: '0.5rem' }} />
      <div className="skel-bar skel-w60" style={{ marginBottom: '1.2rem' }} />
      <div className="skel-bar skel-w40" />
    </div>
  );

  return (
    <>
      {/* Ambient glows */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      <Navbar onLaunch={scrollToApp} />

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
                    onClick={scrollToApp}
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
            APP: SEARCH
            ════════════════════════════════════ */}
        <section id="app" className="app-section" ref={appRef}>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>
                <div className="section-label-line" />
                <span className="section-label-text">Launch App</span>
                <div className="section-label-line" />
              </div>
              <h2 className="section-title">
                FIND YOUR{' '}
                <span className="accent-green">FIRST ISSUE</span>
              </h2>
              <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
                Enter your skills below and let the engine do the work.
              </p>
            </div>

            <div className="search-terminal reveal">
              <div className="terminal c-cut">
                <div className="terminal-bar">
                  <span className="t-dot red" />
                  <span className="t-dot yellow" />
                  <span className="t-dot green" />
                  <span className="t-title">firstpr-pro — skill scanner</span>
                </div>
                <div className="terminal-body">
                  <div className="search-input-row">
                    <span className="search-prefix">$</span>
                    <div className="search-input-container" ref={suggestionRef}>
                      <input
                        id="skill-input"
                        type="text"
                        className="cyber-input"
                        placeholder="enter skills: python, react, rust, go..."
                        value={skills}
                        onChange={handleInputChange}
                        onKeyDown={handleKey}
                        autoComplete="off"
                      />
                      {showSuggestions && (
                        <div className="suggestions-dropdown">
                          {filteredSuggestions.map((s, i) => (
                            <div
                              key={i}
                              className={`suggestion-item ${i === suggestionIndex ? 'active' : ''}`}
                              onClick={() => selectSuggestion(s)}
                            >
                              <span>{s}</span>
                              <span className="suggestion-tag">skill</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      id="scan-btn"
                      className="cyber-submit"
                      onClick={() => findIssues()}
                      disabled={loading || !skills.trim()}
                    >
                      {loading ? 'scanning...' : '> scan'}
                    </button>
                  </div>

                  {error && (
                    <p style={{ color: '#ff5f56', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      {'>'} Error: {error}
                    </p>
                  )}

                  {!loading && searched && issues.length > 0 && (
                    <p className="results-count">
                      {'>'} found {issues.length} issues matching "{skills}"
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Results grid */}
            {loading ? (
              <div className="issues-grid" style={{ marginTop: '2rem' }}>
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : issues.length > 0 ? (
              <div className="issues-grid">
                {issues.map((issue, i) => (
                  <IssueCard key={i} issue={issue} />
                ))}
              </div>
            ) : searched && !loading && (
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {'>'} No issues matched. Try different skills.
                </p>
              </div>
            )}
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
                  onClick={scrollToApp}
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
                <a href="#app">Launch</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

/* skeleton inside the component file for simplicity */
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skel-bar skel-w40" style={{ marginBottom: '0.8rem' }} />
    <div className="skel-bar skel-w90" style={{ marginBottom: '0.5rem' }} />
    <div className="skel-bar skel-w60" style={{ marginBottom: '1.2rem' }} />
    <div className="skel-bar skel-w40" />
  </div>
);

export default Home;
