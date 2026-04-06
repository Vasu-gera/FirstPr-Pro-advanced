import React, { useState, useEffect } from 'react';

const TYPING_LINES = [
  '> scanning repos...',
  '> matching skills: javascript, react...',
  '> filtering "good first issue"...',
  '> found 12 beginner-friendly issues',
  '> ready to contribute ✓',
];

const TypingLine = () => {
  const [lineIdx, setLineIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [pausing, setPausing] = useState(false);

  useEffect(() => {
    if (pausing) {
      const t = setTimeout(() => {
        setPausing(false);
        setDisplayed('');
        setCharIdx(0);
        setLineIdx((i) => (i + 1) % TYPING_LINES.length);
      }, 1800);
      return () => clearTimeout(t);
    }

    const target = TYPING_LINES[lineIdx];
    if (charIdx < target.length) {
      const t = setTimeout(() => {
        setDisplayed(target.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 45);
      return () => clearTimeout(t);
    } else {
      setPausing(true);
    }
  }, [charIdx, lineIdx, pausing]);

  return (
    <p className="hero-typing">
      <span className="typing-prefix"></span>
      {displayed}
      <span className="cursor" />
    </p>
  );
};

const Terminal = ({ lines, title = 'firstpr-pro — bash' }) => (
  <div className="terminal c-cut">
    <div className="terminal-bar">
      <span className="t-dot red" />
      <span className="t-dot yellow" />
      <span className="t-dot green" />
      <span className="t-title">{title}</span>
    </div>
    <div className="terminal-body">
      {lines.map((line, i) => (
        <div key={i} className={`t-line`}>
          {line.prompt && <span className="t-prompt">{line.prompt}</span>}
          {line.cmd && <span className="t-cmd">{line.cmd}</span>}
          {line.out && <span className={`t-out ${line.cls || ''}`}>{line.out}</span>}
        </div>
      ))}
    </div>
  </div>
);

export { TypingLine, Terminal };
