// components/RewriteSuggestions.jsx
// Shows before/after resume bullet rewrites with reasoning

export default function RewriteSuggestions({ suggestions }) {
  if (!suggestions?.length) return null

  return (
    <div className="rewrites-section">
      <h2 className="rewrites-title">✍️ Bullet Point Rewrites</h2>
      <p className="rewrites-subtitle">Stronger ways to phrase your experience for this role</p>
      <div className="rewrites-list">
        {suggestions.map((s, i) => (
          <div key={i} className="rewrite-card">
            <div className="rewrite-before">
              <span className="rewrite-label before-label">Before</span>
              <p>{s.original}</p>
            </div>
            <div className="rewrite-arrow">→</div>
            <div className="rewrite-after">
              <span className="rewrite-label after-label">After</span>
              <p>{s.improved}</p>
            </div>
            <div className="rewrite-reason">
              <span className="reason-label">Why: </span>{s.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
