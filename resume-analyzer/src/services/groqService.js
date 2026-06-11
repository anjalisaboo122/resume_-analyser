// services/groqService.js
// All AI logic is isolated here — prompt engineering, API calls, response parsing.
// This is the most important file to understand and tweak.

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// The model we use — llama3 is free and very capable on Groq
const MODEL = 'llama-3.3-70b-versatile'

// This is the core prompt. Changing this changes everything about the output.
// Notice how we:
//  1. Give the model a clear persona
//  2. Define exact output structure (JSON schema)
//  3. Tell it explicitly NOT to add anything outside the JSON
const SYSTEM_PROMPT = `You are an expert technical recruiter and career coach with 10+ years of experience in the tech industry.

Your job is to analyze a candidate's resume against a job description and provide a detailed, honest gap analysis.

You MUST respond with ONLY a valid JSON object — no markdown, no explanation, no preamble. The JSON must follow this exact schema:

{
  "fit_score": <integer 0-100>,
  "verdict": <"Strong Fit" | "Moderate Fit" | "Weak Fit">,
  "summary": <"2-3 sentence honest overall assessment">,
  "matching_skills": <array of strings — skills found in both resume and JD>,
  "missing_skills": <array of strings — skills in JD but absent from resume>,
  "experience_gaps": <array of strings — experience/seniority/domain gaps>,
  "strengths": <array of strings — standout things the candidate brings>,
  "rewrite_suggestions": <array of objects with shape { "original": string, "improved": string, "reason": string } — pick 2-3 weak resume bullet points and suggest stronger versions>
}

Be specific and actionable. Do not be vague. Do not sugarcoat.`

/**
 * Analyzes a resume against a job description using Groq's LLM API.
 * @param {string} resume - The resume text
 * @param {string} jobDescription - The job description text
 * @param {string} apiKey - Groq API key
 * @returns {Promise<Object>} - Parsed analysis result
 */
export async function analyzeResume(resume, jobDescription, apiKey) {
  const userMessage = `Here is the candidate's resume:
---
${resume}
---

Here is the job description:
---
${jobDescription}
---

Analyze the fit and return the JSON object.`

console.log('using key:', apiKey)


  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3, // Lower = more consistent, structured output
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    console.log('full error:', JSON.stringify(err))  // add this line
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  const rawText = data.choices?.[0]?.message?.content

  if (!rawText) throw new Error('Empty response from Groq')

  // Strip any accidental markdown fences the model might add
  const cleaned = rawText.replace(/```json|```/g, '').trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    throw new Error('Model returned invalid JSON. Try again.')
  }
}
