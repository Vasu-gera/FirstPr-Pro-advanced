import React, { useEffect, useState } from 'react';

const Navbar = ({ onLaunch }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? '0 2px 40px rgba(0,255,136,0.06)' : 'none' }}>
      <div className="container">
        <div className="navbar-inner">
          <a href="#hero" className="nav-logo">
            <span className="nav-logo-bracket">[</span>
            FirstPR Pro
            <span className="nav-logo-bracket">]</span>
          </a>

          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#demo">Demo</a></li>
            <li>
              <a
                href="#app"
                className="nav-cta"
                onClick={(e) => { e.preventDefault(); onLaunch && onLaunch(); }}
              >
                Launch App
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
