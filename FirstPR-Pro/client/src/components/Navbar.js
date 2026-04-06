import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = ({ onLaunch, isDashboard }) => {
  const [scrolled, setScrolled] = useState(false);
  const { user, login, logout } = useAuth() || {};

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
                <li><Link to="/dashboard" style={{textDecoration: 'none', color: 'var(--text)'}}>Scanner</Link></li>
                <li><Link to="/marketplace" style={{textDecoration: 'none', color: 'var(--text)'}}>Marketplace</Link></li>
                <li><Link to="/leaderboard" style={{textDecoration: 'none', color: 'var(--text)'}}>Leaderboard</Link></li>
                
                {user ? (
                  <li style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span style={{color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem'}}>[{user}]</span>
                    <button onClick={logout} style={{background: 'none', border: '1px solid var(--muted)', color: 'var(--muted)', cursor: 'pointer', padding: '0.2rem 0.5rem', borderRadius: '4px'}}>Exit</button>
                  </li>
                ) : (
                  <li>
                    <button 
                      onClick={() => {
                        const name = window.prompt("Enter your hacker alias:");
                        if(name) login(name);
                      }}
                      className="nav-cta"
                      style={{ background: 'none', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', font: 'inherit', cursor: 'pointer', padding: '4px 12px' }}
                    >
                      Login
                    </button>
                  </li>
                )}
                
                <li style={{marginLeft: '1rem'}}>
                  <Link to="/" className="nav-cta" style={{ textDecoration: 'none' }}>
                    &lt; Home
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
