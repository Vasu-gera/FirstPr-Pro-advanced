import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLaunch, isDashboard }) => {
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
          <Link to="/" className="nav-logo">
            <span className="nav-logo-bracket">[</span>
            FirstPR Pro
            <span className="nav-logo-bracket">]</span>
          </Link>

          <ul className="nav-links">
            {!isDashboard ? (
              <>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#demo">Demo</a></li>
                <li>
                  <button
                    className="nav-cta"
                    onClick={(e) => { e.preventDefault(); onLaunch && onLaunch(); }}
                    style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer' }}
                  >
                    Launch App
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="nav-cta" style={{ textDecoration: 'none' }}>
                    &lt; Back to Home
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
