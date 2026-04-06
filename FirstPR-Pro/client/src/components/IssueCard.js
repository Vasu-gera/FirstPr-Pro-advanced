import React from 'react';

const IssueCard = ({ issue }) => {
  const score = issue.score ?? issue.beginner_score ?? Math.floor(Math.random() * 30 + 70);
  const labels = issue.labels || issue.tags || [];
  const repo = issue.repo || issue.repository || 'github/repo';
  const title = issue.title || 'Untitled Issue';
  const url = issue.url || issue.html_url || '#';

  return (
    <div className="issue-card">
      <div className="issue-repo">{'>'} {repo}</div>
      <div className="issue-title">{title}</div>

      {labels.length > 0 && (
        <div className="issue-labels">
          {labels.slice(0, 3).map((label, i) => (
            <span key={i} className="issue-label">
              {typeof label === 'string' ? label : label.name}
            </span>
          ))}
        </div>
      )}

      <div className="issue-footer">
        <span className="issue-score">SCORE: {score}</span>
        <button
          className="issue-view-btn"
          onClick={() => window.open(url, '_blank')}
        >
          {'>'} View Issue
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
