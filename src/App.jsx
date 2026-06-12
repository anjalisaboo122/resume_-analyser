import { useTranslation } from 'react-i18next'
import { useAnalyzer } from './hooks/useAnalyzer'
import InputPanel from './components/InputPanel'
import ResultsPanel from './components/ResultsPanel'

export default function App() {
  const { t, i18n } = useTranslation()
  const {
    resume, setResume,
    jobDescription, setJobDescription,
    provider, saveProvider,
    apiKey, saveApiKey,
    ollamaModel, saveOllamaModel,
    result, loading, error,
    analyze, reset,
  } = useAnalyzer()

  const changeLanguage = (lng) => i18n.changeLanguage(lng)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo-mark">RA</span>
          <div>
            <h1 className="app-title">{t('app_title')}</h1>
            <p className="app-sub">{t('app_sub')}</p>
          </div>
          <div className="lang-switcher">
            <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'lang-btn active' : 'lang-btn'}>EN</button>
            <button onClick={() => changeLanguage('hi')} className={i18n.language === 'hi' ? 'lang-btn active' : 'lang-btn'}>हिं</button>
            <button onClick={() => changeLanguage('te')} className={i18n.language === 'te' ? 'lang-btn active' : 'lang-btn'}>తె</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {!result ? (
          <>
            <InputPanel
              resume={resume} setResume={setResume}
              jobDescription={jobDescription} setJobDescription={setJobDescription}
              provider={provider} saveProvider={saveProvider}
              apiKey={apiKey} saveApiKey={saveApiKey}
              ollamaModel={ollamaModel} saveOllamaModel={saveOllamaModel}
              onAnalyze={analyze}
              loading={loading}
            />
            {error && <div className="error-banner">⚠ {t(error, { defaultValue: error })}</div>}
          </>
        ) : (
          <ResultsPanel result={result} onReset={reset} />
        )}
      </main>
    </div>
  )
}