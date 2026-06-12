// components/ScoreCard.jsx
// Big visual score display at the top of results

export default function ScoreCard({ score, verdict, summary }) {
  const getScoreColor = (s) => {
    if (s >= 70) return 'score-high'
    if (s >= 45) return 'score-mid'
    return 'score-low'
  }

  const getVerdictClass = (v) => {
    if (v === 'Strong Fit') return 'verdict-strong'
    if (v === 'Moderate Fit') return 'verdict-mid'
    if (v === 'Invalid Input') return 'verdict-weak'
    return 'verdict-weak'
  }

  return (
    <div className="score-card">
      <div className={`score-circle ${getScoreColor(score)}`}>
        <span className="score-number">{score}</span>
        <span className="score-label">/ 100</span>
      </div>
      <div className="score-info">
        <span className={`verdict-badge ${getVerdictClass(verdict)}`}>{verdict}</span>
        <p className="summary">{summary}</p>
      </div>
    </div>
  )
}
