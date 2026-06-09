// components/ResultsPanel.jsx
// Assembles all result sub-components

import ScoreCard from './ScoreCard'
import SkillsGrid from './SkillsGrid'
import RewriteSuggestions from './RewriteSuggestions'

export default function ResultsPanel({ result, onReset }) {
  return (
    <div className="results-panel">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <button className="reset-btn" onClick={onReset}>← New Analysis</button>
      </div>

      <ScoreCard
        score={result.fit_score}
        verdict={result.verdict}
        summary={result.summary}
      />

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
