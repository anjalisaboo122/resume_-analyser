import { useAnalyzer } from './hooks/useAnalyzer'
import InputPanel from './components/InputPanel'
import ResultsPanel from './components/ResultsPanel'

export default function App() {
  const {
    resume, setResume,
    jobDescription, setJobDescription,
    result, loading, error,
    analyze, reset,
  } = useAnalyzer()

  console.log(import.meta.env.VITE_GROQ_API_KEY)


  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo-mark">✨</span>
          <div>
            <h1 className="app-title">resume analyzer</h1>
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