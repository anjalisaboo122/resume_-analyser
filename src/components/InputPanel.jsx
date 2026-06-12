import { useTranslation } from 'react-i18next'

export default function InputPanel({
  resume, setResume,
  jobDescription, setJobDescription,
  provider, saveProvider,
  apiKey, saveApiKey,
  ollamaModel, saveOllamaModel,
  onAnalyze, loading
}) {
  const { t } = useTranslation()

  return (
    <div className="input-panel">

      {/* AI Provider selector */}
      <div className="provider-section">
        <label>{t('provider_label')}</label>
        <div className="provider-toggle">
          <button
            className={`provider-btn ${provider === 'groq' ? 'active' : ''}`}
            onClick={() => saveProvider('groq')}
          >
            ☁️ Groq
          </button>
          <button
            className={`provider-btn ${provider === 'ollama' ? 'active' : ''}`}
            onClick={() => saveProvider('ollama')}
          >
            🖥️ Ollama (Local)
          </button>
        </div>

        {provider === 'groq' && (
          <div className="provider-config">
            <label>{t('api_key_label')} (BYOK)</label>
            <input
              type="password"
              placeholder={t('api_key_placeholder')}
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
            />
            <span className="hint">🔑 {t('groq_note')}</span>
          </div>
        )}

        {provider === 'ollama' && (
          <div className="provider-config">
            <label>{t('ollama_model_label')}</label>
            <input
              type="text"
              placeholder={t('ollama_model_placeholder')}
              value={ollamaModel}
              onChange={(e) => saveOllamaModel(e.target.value)}
            />
            <span className="hint">🖥️ {t('ollama_note')}</span>
          </div>
        )}
      </div>

      <div className="textarea-group">
        <label htmlFor="resume">📄 {t('resume_label')}</label>
        <textarea
          id="resume"
          placeholder={t('resume_placeholder')}
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          rows={12}
        />
        <span className="char-count">{resume.length} chars</span>
      </div>

      <div className="textarea-group">
        <label htmlFor="jd">💼 {t('jd_label')}</label>
        <textarea
          id="jd"
          placeholder={t('jd_placeholder')}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={12}
        />
        <span className="char-count">{jobDescription.length} chars</span>
      </div>

      <button className="analyze-btn" onClick={onAnalyze} disabled={loading}>
        {loading ? (
          <span className="loading-text">
            <span className="spinner" />
            {t('analyzing')}
          </span>
        ) : t('analyze_btn')}
      </button>
    </div>
  )
}