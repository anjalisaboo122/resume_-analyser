// hooks/useAnalyzer.js
// Custom hook — keeps all state and side-effect logic out of components.
// Components stay clean and just render.

import { useState } from 'react'
import { analyzeResume } from '../services/groqService'

export function useAnalyzer() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_key') || '')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const saveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem('groq_key', key) // persist so user doesn't re-enter every time
  }

  const analyze = async () => {
    if (!resume.trim()) return setError('Please paste your resume.')
    if (!jobDescription.trim()) return setError('Please paste the job description.')
    if (!apiKey.trim()) return setError('Please enter your Groq API key.')

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const analysis = await analyzeResume(resume, jobDescription, apiKey)
      setResult(analysis)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
  }

  return {
    resume, setResume,
    jobDescription, setJobDescription,
    apiKey, saveApiKey,
    result, loading, error,
    analyze, reset,
  }
}
