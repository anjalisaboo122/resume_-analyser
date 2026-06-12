import { useTranslation } from 'react-i18next'
import ScoreCard from './ScoreCard'
import SkillsGrid from './SkillsGrid'
import RewriteSuggestions from './RewriteSuggestions'

export default function ResultsPanel({ result, onReset }) {
  const { t } = useTranslation()
  return (
    <div className="results-panel">
      <div className="results-header">
        <h2>🎀 {t('results_title')}</h2>
        <button className="reset-btn" onClick={onReset}>{t('new_analysis')}</button>
      </div>
      <ScoreCard score={result.fit_score} verdict={result.verdict} summary={result.summary} />
      <SkillsGrid
        matchingSkills={result.matching_skills}
        missingSkills={result.missing_skills}
        experienceGaps={result.experience_gaps}
        strengths={result.strengths}
      />
      <RewriteSuggestions suggestions={result.rewrite_suggestions} />
    </div>
  )
}