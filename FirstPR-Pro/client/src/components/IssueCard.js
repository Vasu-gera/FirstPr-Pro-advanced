import React from "react";

const labelStyles = {
  "good first issue": "label-green",
  "help wanted": "label-blue",
};

function getScoreColor(score) {
  if (score >= 80) return "#34d399";
  if (score >= 50) return "#fbbf24";
  return "#f87171";
}

export default function IssueCard({ issue }) {
  const { title, repo, score, labels = [], url, html_url, repository } = issue;
  
  const displayRepo = repo || repository;
  const displayScore = score || 0;
  const scoreColor = getScoreColor(displayScore);
  const externalLink = url || html_url;

  return (
    <div className="issue-card">
      <div className="card-head">
        <div className="card-meta">
          <p className="card-repo">{displayRepo}</p>
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="score-badge">
          <div className="score-num" style={{ color: scoreColor, borderColor: `${scoreColor}40`, background: `${scoreColor}10` }}>
            {displayScore}
          </div>
          <span className="score-label">score</span>
        </div>
      </div>

      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${displayScore}%`, background: scoreColor }}
        />
      </div>

      <div className="card-labels">
        {labels.map((label) => (
          <span
            key={label}
            className={`label-tag ${labelStyles[label.toLowerCase()] || "label-gray"}`}
          >
            <span className="label-dot" />
            {label}
          </span>
        ))}
      </div>

      <a href={externalLink} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
        <button className="view-btn">View Issue →</button>
      </a>
    </div>
  );
}
