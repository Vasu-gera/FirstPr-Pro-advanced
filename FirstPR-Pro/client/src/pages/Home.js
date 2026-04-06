import React, { useState } from 'react';
import IssueCard from '../components/IssueCard';

const Home = () => {
  const [skills, setSkills] = useState('');
  const [issues, setIssues] = useState([]);

  // TODO: Add loading state
  // TODO: Add error handling state

  const findIssues = async () => {
    // TODO: Set loading state to true
    // TODO: Clear previous errors

    try {
      const response = await fetch(`http://localhost:8000/issues?skills=${encodeURIComponent(skills)}`);
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      // TODO: Handle error state
      console.error("Failed to fetch issues", error);
    } finally {
      // TODO: Set loading state to false
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      findIssues();
    }
  };

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <div className="hero-section">
        <span className="eyebrow-pill">⚡ Open Source Contribution Finder</span>
        <h1 className="hero-title">
          Land your <span className="gradient-text">first pull request</span>
        </h1>
        <p className="hero-sub">
          Enter your skills and discover curated GitHub issues scored for
          beginner-friendliness.
        </p>

        {/* ── Skill Input ── */}
        <div className="search-wrap">
          <div className="tag-input-box">
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type skills (e.g., React, Python) and press Enter..."
              className="skill-input"
            />
          </div>
          
          <button
            className="submit-btn"
            onClick={findIssues}
          >
            Find Issues →
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      <section className="results-section">
        {issues.length > 0 && (
          <div className="results-header">
            <div>
              <h2 className="results-title">Matched Issues</h2>
              <p className="results-sub">
                {issues.length} issues found for "{skills}"
              </p>
            </div>
            <span className="tags-pill">Sorted by score</span>
          </div>
        )}

        {issues.length > 0 ? (
          <div className="issues-grid">
            {issues.map((issue, index) => (
              <IssueCard
                key={index}
                issue={issue}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No issues found yet.</h3>
            <p>Enter some skills above and hit search!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
