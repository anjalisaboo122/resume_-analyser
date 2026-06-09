# Resume Analyzer

AI-powered resume vs job description gap analyzer. Built with React + Groq (Llama 3 70B).

## What it does

Paste your resume and a job description → get back:
- **Fit score** (0–100)
- **Matching skills** — what you already have
- **Missing skills** — what the JD wants that you lack
- **Experience gaps** — seniority/domain mismatches
- **Strengths** — what makes you stand out
- **Bullet rewrites** — stronger versions of your resume lines

## Running locally

1. Clone the repo
2. Copy `.env.example` to `.env` and add your Groq API key
3. Run:

```bash
npm install
npm run dev
```

Get a free Groq API key at [console.groq.com](https://console.groq.com)

## Deploying to GitLab Pages

Push to `main` — the `.gitlab-ci.yml` handles the rest. Your app will be live at:
`https://<your-username>.gitlab.io/<repo-name>`

## Project structure

```
src/
├── components/
│   ├── InputPanel.jsx       # Resume + JD input forms
│   ├── ResultsPanel.jsx     # Assembles result views
│   ├── ScoreCard.jsx        # Big score display
│   ├── SkillsGrid.jsx       # 4-quadrant skills breakdown
│   └── RewriteSuggestions.jsx # Before/after bullet rewrites
├── services/
│   └── groqService.js       # All AI logic — prompt + API call
├── hooks/
│   └── useAnalyzer.js       # State management
├── App.jsx
└── index.css
```

The most important file to understand is `src/services/groqService.js` — that's where the prompt lives and where you can experiment.
