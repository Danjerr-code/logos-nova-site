'use client';

import { useState } from 'react';
import Link from 'next/link';

const questions = [
  {
    category: 'Data Infrastructure',
    question: 'How is your operational data currently stored?',
    options: [
      'Spreadsheets and manual files',
      'Mixed systems with limited integration',
      'Centralized database',
      'Cloud platform with integrated systems',
    ],
  },
  {
    category: 'Data Infrastructure',
    question:
      'What percentage of your key data fields are consistently populated?',
    options: ['Less than 50%', '50-70%', '70-90%', 'Over 90%'],
  },
  {
    category: 'Data Infrastructure',
    question:
      'Do you have documented data definitions and ownership for your core datasets?',
    options: [
      'No documentation exists',
      'Partial documentation',
      'Mostly documented',
      'Fully documented with clear ownership',
    ],
  },
  {
    category: 'Process Maturity',
    question:
      'What percentage of your core business processes are formally documented?',
    options: [
      'Less than 25%',
      '25-50%',
      '50-75%',
      'Over 75%',
    ],
  },
  {
    category: 'Process Maturity',
    question:
      'How do your teams currently handle repetitive data-heavy tasks?',
    options: [
      'Fully manual',
      'Mostly manual with some basic tools',
      'Mix of manual and automated',
      'Mostly automated',
    ],
  },
  {
    category: 'Process Maturity',
    question:
      'How quickly can your organization implement a new technology or process change?',
    options: [
      'Over 12 months',
      '6-12 months',
      '3-6 months',
      'Under 3 months',
    ],
  },
  {
    category: 'Leadership and Strategy',
    question:
      'Does your organization have a defined AI or digital transformation strategy?',
    options: [
      'No strategy exists',
      'Informal discussions only',
      'Strategy in development',
      'Defined and funded strategy',
    ],
  },
  {
    category: 'Leadership and Strategy',
    question: 'How would you describe leadership attitude toward AI adoption?',
    options: [
      'Resistant or unaware',
      'Cautious but open',
      'Supportive',
      'Actively championing AI initiatives',
    ],
  },
  {
    category: 'Technical Readiness',
    question: 'What is your current cloud infrastructure situation?',
    options: [
      'On-premise only',
      'Hybrid with limited cloud',
      'Significant cloud presence',
      'Cloud-first architecture',
    ],
  },
  {
    category: 'Technical Readiness',
    question:
      'Do you have technical staff capable of supporting AI implementation?',
    options: [
      'No technical staff',
      'Limited capability',
      'Moderate capability',
      'Strong internal capability',
    ],
  },
];

function getReadiness(score) {
  if (score <= 19)
    return {
      label: 'Early Stage',
      textColor: 'text-red-400',
      borderColor: 'border-red-400',
      bgColor: 'bg-red-400/10',
    };
  if (score <= 27)
    return {
      label: 'Developing',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-400',
      bgColor: 'bg-orange-400/10',
    };
  if (score <= 34)
    return {
      label: 'Advancing',
      textColor: 'text-yellow-300',
      borderColor: 'border-yellow-300',
      bgColor: 'bg-yellow-300/10',
    };
  return {
    label: 'AI-Ready',
    textColor: 'text-green-400',
    borderColor: 'border-green-400',
    bgColor: 'bg-green-400/10',
  };
}

function timelineBadge(timeline) {
  if (timeline === '0-30 days')
    return 'bg-red-500/20 text-red-400 border border-red-500/40';
  if (timeline === '30-90 days')
    return 'bg-orange-500/20 text-orange-400 border border-orange-500/40';
  return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40';
}

function impactBadge(impact) {
  if (impact === 'High')
    return 'bg-green-500/20 text-green-400 border border-green-500/40';
  if (impact === 'Medium')
    return 'bg-blue-500/20 text-blue-400 border border-blue-500/40';
  return 'bg-white/10 text-white/60 border border-white/20';
}

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userData, setUserData] = useState({
    firstName: '',
    company: '',
    email: '',
    companySize: '',
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  function handleOptionSelect(optionIndex) {
    const q = questions[currentQuestion];
    const newAnswer = {
      question: q.question,
      selected: q.options[optionIndex],
      score: optionIndex + 1,
    };
    const updated = [...answers];
    updated[currentQuestion] = newAnswer;
    setAnswers(updated);

    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep(1);
    }
  }

  function handleBack() {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  }

  async function handleSubmitUserData(e) {
    e.preventDefault();
    setCurrentStep(2);
    const score = answers.reduce((sum, a) => sum + a.score, 0);
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, score, userData }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.analysis);
        setCurrentStep(3);
        // Fire-and-forget lead capture — don't block showing results
        fetch('/api/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: userData.firstName,
            company: userData.company,
            email: userData.email,
            companySize: userData.companySize,
            score: data.analysis.score,
            readinessLevel: data.analysis.readiness_level,
            criticalGaps: data.analysis.critical_gaps,
          }),
        }).catch(() => {});
      } else {
        setError(data.error || 'Assessment failed');
        setCurrentStep(3);
      }
    } catch {
      setError('Assessment failed');
      setCurrentStep(3);
    }
  }

  function resetAssessment() {
    setCurrentStep(0);
    setCurrentQuestion(0);
    setAnswers([]);
    setUserData({ firstName: '', company: '', email: '', companySize: '' });
    setResults(null);
    setError(null);
  }

  // ── VIEW 1: Questions ────────────────────────────────────────────
  if (currentStep === 0) {
    const q = questions[currentQuestion];
    const selected = answers[currentQuestion];
    const progressPct = (currentQuestion / 10) * 100;

    return (
      <section className="bg-navy min-h-screen py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-white/50 mb-2">
              <span>Question {currentQuestion + 1} of 10</span>
              <span className="text-gold">{q.category}</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-white text-2xl font-bold mb-8">{q.question}</h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(i)}
                className={`text-left px-6 py-4 rounded-lg border transition-all duration-150 ${
                  selected?.selected === option
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/20 text-white hover:border-gold/50 hover:bg-white/5'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="mt-8 text-white/40 hover:text-white/80 text-sm transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </section>
    );
  }

  // ── VIEW 2: Email Gate ───────────────────────────────────────────
  if (currentStep === 1) {
    return (
      <section className="bg-navy min-h-screen py-16 px-6 flex items-center">
        <div className="max-w-lg mx-auto w-full">
          <h2 className="text-white text-3xl font-bold mb-3">
            Your results are ready
          </h2>
          <p className="text-white/60 mb-10">
            Enter your details to see your full AI Readiness Report with
            personalized recommendations.
          </p>
          <form onSubmit={handleSubmitUserData} className="flex flex-col gap-5">
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">
                First Name
              </label>
              <input
                required
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2.5 text-white focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">
                Company Name
              </label>
              <input
                required
                value={userData.company}
                onChange={(e) =>
                  setUserData({ ...userData, company: e.target.value })
                }
                className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2.5 text-white focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">
                Work Email
              </label>
              <input
                required
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2.5 text-white focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">
                Company Size
              </label>
              <select
                required
                value={userData.companySize}
                onChange={(e) =>
                  setUserData({ ...userData, companySize: e.target.value })
                }
                className="w-full bg-navy border border-gold/30 rounded px-4 py-2.5 text-white focus:outline-none focus:border-gold"
              >
                <option value="">Select size</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="201-500">201–500</option>
                <option value="500+">500+</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-gold text-navy font-bold px-8 py-3 rounded hover:opacity-90 transition-opacity mt-2"
            >
              See My Results
            </button>
          </form>
        </div>
      </section>
    );
  }

  // ── VIEW 3: Loading ──────────────────────────────────────────────
  if (currentStep === 2) {
    return (
      <section className="bg-navy min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gold rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-white text-xl">Analyzing your responses...</p>
        </div>
      </section>
    );
  }

  // ── VIEW 4: Results ──────────────────────────────────────────────
  if (currentStep === 3) {
    // Error state
    if (error || !results) {
      return (
        <section className="bg-navy min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-white text-xl mb-6">
              We encountered an issue generating your report.
            </p>
            <Link
              href="/contact"
              className="bg-gold text-navy font-bold px-8 py-3 rounded hover:opacity-90 transition-opacity inline-block"
            >
              Schedule a direct consultation instead
            </Link>
          </div>
        </section>
      );
    }

    const score = results.score;
    const readiness = getReadiness(score);

    return (
      <section className="bg-navy min-h-screen py-16 px-6">
        <div className="max-w-4xl mx-auto">

          {/* A. Score display */}
          <div className="text-center mb-10">
            <div
              className={`inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 ${readiness.borderColor} ${readiness.bgColor} mb-4`}
            >
              <span className="text-white text-3xl font-bold">{score}</span>
              <span className="text-white/50 text-sm">/ 40</span>
            </div>
            <p className={`text-xl font-bold mb-2 ${readiness.textColor}`}>
              {readiness.label}
            </p>
            <h1 className="text-white text-2xl font-bold">
              {userData.company} AI Readiness Report
            </h1>
          </div>

          {/* B. Headline */}
          <p className="text-white/70 text-lg text-center italic mb-12">
            {results.headline}
          </p>

          {/* C. Strengths + Gaps */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="border border-green-500/30 rounded-lg p-6">
              <h3 className="text-green-400 font-bold mb-4">Top Strengths</h3>
              <ul className="space-y-3">
                {results.top_strengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-white/80">
                    <span className="text-green-400 flex-shrink-0 font-bold">
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-red-500/30 rounded-lg p-6">
              <h3 className="text-red-400 font-bold mb-4">Critical Gaps</h3>
              <ul className="space-y-3">
                {results.critical_gaps.map((g, i) => (
                  <li key={i} className="flex gap-3 text-white/80">
                    <span className="text-red-400 flex-shrink-0 font-bold">
                      ✕
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* D. Recommendations */}
          <h3 className="text-white text-xl font-bold mb-5">
            Priority Recommendations
          </h3>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {results.priority_recommendations.map((rec, i) => (
              <div
                key={i}
                className="border border-gold/30 rounded-lg p-5 flex flex-col gap-4"
              >
                <p className="text-white font-medium leading-snug flex-1">
                  {rec.action}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${timelineBadge(rec.timeline)}`}
                  >
                    {rec.timeline}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${impactBadge(rec.impact)}`}
                  >
                    {rec.impact} Impact
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* E. Logos Nova note */}
          <div className="border border-gold rounded-lg p-8 mb-12">
            <h3 className="text-gold font-bold mb-3">
              How Logos Nova Can Help
            </h3>
            <p className="text-white/80 leading-relaxed">
              {results.logos_nova_note}
            </p>
          </div>

          {/* F. CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gold text-navy font-bold px-10 py-3 rounded hover:opacity-90 transition-opacity text-center"
            >
              Schedule a Free Consultation
            </Link>
            <button
              onClick={resetAssessment}
              className="border-2 border-gold text-gold font-bold px-10 py-3 rounded hover:bg-gold hover:text-navy transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </section>
    );
  }
}
