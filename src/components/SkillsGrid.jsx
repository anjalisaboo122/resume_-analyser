// components/SkillsGrid.jsx
// Displays matching skills, missing skills, gaps, and strengths in a grid

function TagList({ items, variant }) {
  if (!items?.length) return <p className="empty-state">None found</p>
  return (
    <ul className="tag-list">
      {items.map((item, i) => (
        <li key={i} className={`tag tag-${variant}`}>{item}</li>
      ))}
    </ul>
  )
}

export default function SkillsGrid({ matchingSkills, missingSkills, experienceGaps, strengths }) {
  return (
    <div className="skills-grid">
      <div className="skills-section">
        <h3 className="section-title match">✅ Matching Skills</h3>
        <TagList items={matchingSkills} variant="match" />
      </div>

      <div className="skills-section">
        <h3 className="section-title missing">❌ Missing Skills</h3>
        <TagList items={missingSkills} variant="missing" />
      </div>

      <div className="skills-section">
        <h3 className="section-title gap">⚠️ Experience Gaps</h3>
        <TagList items={experienceGaps} variant="gap" />
      </div>

      <div className="skills-section">
        <h3 className="section-title strength">🌟 Strengths</h3>
        <TagList items={strengths} variant="strength" />
      </div>
    </div>
  )
}
