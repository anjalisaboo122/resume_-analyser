// components/InputPanel.jsx
// The left/top panel where users paste their resume and JD

export default function InputPanel({ resume, setResume, jobDescription, setJobDescription, apiKey, saveApiKey, onAnalyze, loading }) {
  return (
    <div className="input-panel">
      <div className="api-key-row">
        <label htmlFor="apiKey">Groq API Key</label>
        <input
          id="apiKey"
          type="password"
          placeholder="gsk_..."
          value={apiKey}
          onChange={(e) => saveApiKey(e.target.value)}
        />
        <span className="hint">
          Get yours free at{' '}
          <a href="https://console.groq.com" target="_blank" rel="noreferrer">
            console.groq.com
          </a>
        </span>
      </div>

      <div className="textarea-group">
        <label htmlFor="resume">Your Resume</label>
        <textarea
          id="resume"
          placeholder="Paste your full resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          rows={12}
        />
        <span className="char-count">{resume.length} chars</span>
      </div>

      <div className="textarea-group">
        <label htmlFor="jd">Job Description</label>
        <textarea
          id="jd"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={12}
        />
        <span className="char-count">{jobDescription.length} chars</span>
      </div>

      <button
        className="analyze-btn"
        onClick={onAnalyze}
        disabled={loading}
      >
        {loading ? (
          <span className="loading-text">
            <span className="spinner" />
            Analyzing...
          </span>
        ) : (
          'Analyze Fit →'
        )}
      </button>
    </div>
  )
}
