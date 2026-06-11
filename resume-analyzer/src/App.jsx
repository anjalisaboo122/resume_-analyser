// App.jsx
// Root component — thin orchestration layer.
// All logic is in useAnalyzer(), all UI is in sub-components.

import { useAnalyzer } from './hooks/useAnalyzer'
import InputPanel from './components/InputPanel'
import ResultsPanel from './components/ResultsPanel'

export default function App() {
  const {
    resume, setResume,
    jobDescription, setJobDescription,
    apiKey, saveApiKey,
    result, loading, error,
    analyze, reset,
  } = useAnalyzer()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo-mark">RA</span>
          <div>
            <h1 className="app-title"> resume analyzer</h1>
            <p className="app-sub">Powered by Groq · Llama 3 70B</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {!result ? (
          <>
            <InputPanel
              resume={resume}
              setResume={setResume}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              apiKey={apiKey}
              saveApiKey={saveApiKey}
              onAnalyze={analyze}
              loading={loading}
            />
            {error && (
              <div className="error-banner">
                ⚠ {error}
              </div>
            )}
          </>
        ) : (
          <ResultsPanel result={result} onReset={reset} />
        )}
      </main>
    </div>
  )
}
