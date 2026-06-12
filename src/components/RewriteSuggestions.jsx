import { useTranslation } from 'react-i18next'

export default function RewriteSuggestions({ suggestions }) {
  const { t } = useTranslation()
  if (!suggestions?.length) return null
  return (
    <div className="rewrites-section">
      <h2 className="rewrites-title">✍️ {t('rewrites_title')}</h2>
      <p className="rewrites-subtitle">{t('rewrites_sub')}</p>
      <div className="rewrites-list">
        {suggestions.map((s, i) => (
          <div key={i} className="rewrite-card">
            <div className="rewrite-before">
              <span className="rewrite-label before-label">{t('before')}</span>
              <p>{s.original}</p>
            </div>
            <div className="rewrite-arrow">→</div>
            <div className="rewrite-after">
              <span className="rewrite-label after-label">{t('after')}</span>
              <p>{s.improved}</p>
            </div>
            <div className="rewrite-reason">
              <span className="reason-label">{t('why')}</span>{s.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}