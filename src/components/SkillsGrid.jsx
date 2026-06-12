import { useTranslation } from 'react-i18next'

function TagList({ items, variant }) {
  const { t } = useTranslation()
  if (!items?.length) return <p className="empty-state">{t('none_found')}</p>
  return (
    <ul className="tag-list">
      {items.map((item, i) => (
        <li key={i} className={`tag tag-${variant}`}>{item}</li>
      ))}
    </ul>
  )
}

export default function SkillsGrid({ matchingSkills, missingSkills, experienceGaps, strengths }) {
  const { t } = useTranslation()
  return (
    <div className="skills-grid">
      <div className="skills-section">
        <h3 className="section-title match">✅ {t('matching_skills')}</h3>
        <TagList items={matchingSkills} variant="match" />
      </div>
      <div className="skills-section">
        <h3 className="section-title missing">❌ {t('missing_skills')}</h3>
        <TagList items={missingSkills} variant="missing" />
      </div>
      <div className="skills-section">
        <h3 className="section-title gap">⚠️ {t('experience_gaps')}</h3>
        <TagList items={experienceGaps} variant="gap" />
      </div>
      <div className="skills-section">
        <h3 className="section-title strength">🌟 {t('strengths')}</h3>
        <TagList items={strengths} variant="strength" />
      </div>
    </div>
  )
}