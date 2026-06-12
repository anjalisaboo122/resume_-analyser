// services/groqService.js
// Supports two AI providers:
//   1. Groq  — cloud, needs API key (BYOK)
//   2. Ollama — local inference, no key needed, just a running instance

const getSystemPrompt = (languageInstruction) => `You are an expert technical recruiter and career coach with 10+ years of experience in the tech industry.

Your job is to analyze a candidate's resume against a job description and provide a detailed, honest gap analysis.

You MUST respond with ONLY a valid JSON object — no markdown, no explanation, no preamble. The JSON must follow this exact schema:

{
  "fit_score": <integer 0-100>,
  "verdict": <"Strong Fit" | "Moderate Fit" | "Weak Fit">,
  "summary": <"2-3 sentence honest overall assessment">,
  "matching_skills": <array of strings>,
  "missing_skills": <array of strings>,
  "experience_gaps": <array of strings>,
  "strengths": <array of strings>,
  "rewrite_suggestions": <array of objects: { "original": string, "improved": string, "reason": string }>
}

Be specific and actionable. Do not sugarcoat.

LANGUAGE INSTRUCTION: ${languageInstruction}`
export async function analyzeResume(resume, jobDescription, { provider, apiKey, ollamaModel, language }) {  // i18n/l10n concept: the AI prompt stays in English regardless of UI language
  // because the LLM performs best in English. The UI is localized, the AI layer is not.

  const languageInstruction = language === 'hi' 
    ? 'Respond with all text content in Hindi (except skill/technology names which should stay in English).'
    : language === 'te'
    ? 'Respond with all text content in Telugu (except skill/technology names which should stay in English).'
    : 'Respond in English.'
    
const userMessage = `${languageInstruction}

Here is the candidate's resume:
---
${resume}
---
Here is the job description:
---
${jobDescription}
---
Analyze the fit and return the JSON object.`
  let url, headers, body

  if (provider === 'ollama') {
    // Local inference — Ollama exposes an OpenAI-compatible API
    url = 'http://localhost:11434/v1/chat/completions'
    headers = { 'Content-Type': 'application/json' }
    body = {
      model: ollamaModel || 'llama3',
      messages: [
        { role: 'system', content: getSystemPrompt(languageInstruction) },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
    }
  } else {
    // Groq — cloud, BYOK
    url = 'https://api.groq.com/openai/v1/chat/completions'
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    }
    body = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: getSystemPrompt(languageInstruction) },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  const rawText = data.choices?.[0]?.message?.content
  if (!rawText) throw new Error('Empty response from AI')

  const cleaned = rawText.replace(/```json|```/g, '').trim()
  try {
    return JSON.parse(cleaned)
  } catch {
    throw new Error('Model returned invalid JSON. Try again.')
  }
}