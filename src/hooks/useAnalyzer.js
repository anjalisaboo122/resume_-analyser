import { useState } from 'react'
import { analyzeResume } from '../services/groqService'
import i18n from '../i18n'


export function useAnalyzer() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [provider, setProvider] = useState(localStorage.getItem('ra_provider') || 'groq')
  const [apiKey, setApiKey] = useState(localStorage.getItem('ra_apikey') || '')
  const [ollamaModel, setOllamaModel] = useState(localStorage.getItem('ra_ollama_model') || 'llama3.2') 
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const saveProvider = (p) => { setProvider(p); localStorage.setItem('ra_provider', p) }
  const saveApiKey = (k) => { setApiKey(k); localStorage.setItem('ra_apikey', k) }
  const saveOllamaModel = (m) => { setOllamaModel(m); localStorage.setItem('ra_ollama_model', m) }

  const analyze = async () => {
    if (!resume.trim()) return setError('error_resume')
    if (!jobDescription.trim()) return setError('error_jd')
    if (provider === 'groq' && !apiKey.trim()) return setError('error_key')
    if (provider === 'ollama' && !ollamaModel.trim()) return setError('error_model')

    setLoading(true)
    setError(null)
    setResult(null)

    try {
    const analysis = await analyzeResume(resume, jobDescription, {
      provider,
      apiKey,
      ollamaModel,
      language: i18n.language,
    })
      setResult(analysis)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setResult(null); setError(null) }

  return {
    resume, setResume,
    jobDescription, setJobDescription,
    provider, saveProvider,
    apiKey, saveApiKey,
    ollamaModel, saveOllamaModel,
    result, loading, error,
    analyze, reset,
  }
}