'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';

// ── Questions (unchanged) ─────────────────────────────────────────
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
    question: 'What percentage of your key data fields are consistently populated?',
    options: ['Less than 50%', '50-70%', '70-90%', 'Over 90%'],
  },
  {
    category: 'Data Infrastructure',
    question: 'Do you have documented data definitions and ownership for your core datasets?',
    options: [
      'No documentation exists',
      'Partial documentation',
      'Mostly documented',
      'Fully documented with clear ownership',
    ],
  },
  {
    category: 'Process Maturity',
    question: 'What percentage of your core business processes are formally documented?',
    options: ['Less than 25%', '25-50%', '50-75%', 'Over 75%'],
  },
  {
    category: 'Process Maturity',
    question: 'How do your teams currently handle repetitive data-heavy tasks?',
    options: [
      'Fully manual',
      'Mostly manual with some basic tools',
      'Mix of manual and automated',
      'Mostly automated',
    ],
  },
  {
    category: 'Process Maturity',
    question: 'How quickly can your organization implement a new technology or process change?',
    options: ['Over 12 months', '6-12 months', '3-6 months', 'Under 3 months'],
  },
  {
    category: 'Leadership and Strategy',
    question: 'Does your organization have a defined AI or digital transformation strategy?',
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
    question: 'Do you have technical staff capable of supporting AI implementation?',
    options: [
      'No technical staff',
      'Limited capability',
      'Moderate capability',
      'Strong internal capability',
    ],
  },
];

// ── Scoring (unchanged) ───────────────────────────────────────────
function getReadiness(score) {
  if (score <= 19) return { label: 'Early Stage',  color: '#ef4444' };
  if (score <= 27) return { label: 'Developing',   color: '#f97316' };
  if (score <= 34) return { label: 'Advancing',    color: '#eab308' };
  return             { label: 'AI-Ready',      color: '#22c55e' };
}

// ── Shared background style ───────────────────────────────────────
const bgBase = {
  minHeight: '100vh',
  backgroundColor: '#080e1a',
  backgroundImage:
    'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), ' +
    'linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
  backgroundSize: '60px 60px',
  fontFamily: "'Space Grotesk', sans-serif",
  display: 'flex',
  flexDirection: 'column',
};

// ── Field style helper ────────────────────────────────────────────
const fieldStyle = (focused) => ({
  background: 'rgba(13,24,41,0.8)',
  border: `1px solid ${focused ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
  borderRadius: '4px',
  padding: '14px 18px',
  color: '#ffffff',
  fontSize: '15px',
  width: '100%',
  marginBottom: '16px',
  fontFamily: "'Space Grotesk', sans-serif",
  outline: 'none',
  transition: 'border-color 0.15s ease',
});

// ─────────────────────────────────────────────────────────────────
export default function AssessmentPage() {
  // Core state (logic unchanged)
  const [currentStep, setCurrentStep]       = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers]               = useState([]);
  const [userData, setUserData]             = useState({ firstName: '', company: '', email: '', companySize: '' });
  const [results, setResults]               = useState(null);
  const [error, setError]                   = useState(null);

  // Animation state
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState([false, false, false, false]);
  const [slidePhase, setSlidePhase]         = useState('visible'); // 'visible' | 'exiting' | 'entering'
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredOption, setHoveredOption]   = useState(null);
  const [focusedField, setFocusedField]     = useState(null);

  // Typewriter: re-run on each question change
  useEffect(() => {
    if (currentStep !== 0) return;
    setTypewriterText('');
    setTypewriterDone(false);
    setOptionsVisible([false, false, false, false]);
    setSelectedOption(null);
    setHoveredOption(null);

    const full = questions[currentQuestion].question;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypewriterText(full.slice(0, i));
      if (i >= full.length) { clearInterval(iv); setTypewriterDone(true); }
    }, 30);
    return () => clearInterval(iv);
  }, [currentQuestion, currentStep]);

  // Stagger options after typewriter finishes
  useEffect(() => {
    if (!typewriterDone || currentStep !== 0) return;
    questions[currentQuestion].options.forEach((_, i) => {
      setTimeout(() => {
        setOptionsVisible(prev => { const n = [...prev]; n[i] = true; return n; });
      }, i * 100);
    });
  }, [typewriterDone, currentQuestion, currentStep]);

  // ── Handlers (logic unchanged, animation added) ─────────────────
  function advanceWithSlide(fn) {
    setSlidePhase('exiting');
    setTimeout(() => {
      fn();
      setSlidePhase('entering');
      requestAnimationFrame(() => requestAnimationFrame(() => setSlidePhase('visible')));
    }, 350);
  }

  function handleOptionSelect(optionIndex) {
    if (selectedOption !== null) return;
    const q = questions[currentQuestion];
    const updated = [...answers];
    updated[currentQuestion] = { question: q.question, selected: q.options[optionIndex], score: optionIndex + 1 };
    setAnswers(updated);
    setSelectedOption(optionIndex);

    setTimeout(() => {
      if (currentQuestion < 9) {
        advanceWithSlide(() => setCurrentQuestion(prev => prev + 1));
      } else {
        setCurrentStep(1);
      }
    }, 300);
  }

  function handleBack() {
    if (currentQuestion > 0) advanceWithSlide(() => setCurrentQuestion(prev => prev - 1));
  }

  async function handleSubmitUserData(e) {
    e.preventDefault();
    setCurrentStep(2);
    const score = answers.reduce((sum, a) => sum + a.score, 0);
    try {
      const res  = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, score, userData }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.analysis);
        setCurrentStep(3);
        fetch('/api/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: userData.firstName, company: userData.company,
            email: userData.email, companySize: userData.companySize,
            score: data.analysis.score, readinessLevel: data.analysis.readiness_level,
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
    setCurrentStep(0); setCurrentQuestion(0); setAnswers([]);
    setUserData({ firstName: '', company: '', email: '', companySize: '' });
    setResults(null); setError(null);
    setTypewriterText(''); setTypewriterDone(false);
    setOptionsVisible([false, false, false, false]);
    setSlidePhase('visible'); setSelectedOption(null);
  }

  // ── Slide container style ────────────────────────────────────────
  const slideStyle = {
    transition: 'transform 0.35s ease, opacity 0.35s ease',
    transform:
      slidePhase === 'exiting'  ? 'translateX(-40px)' :
      slidePhase === 'entering' ? 'translateX(40px)'  : 'translateX(0)',
    opacity: slidePhase === 'visible' ? 1 : 0,
  };

  // ── VIEW 0: Questions ────────────────────────────────────────────
  if (currentStep === 0) {
    const q = questions[currentQuestion];
    const progressPct = (currentQuestion / 10) * 100;

    return (
      <div style={bgBase}>
        {/* Fixed progress bar */}
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 50, padding: '16px 40px 0', backgroundColor: 'rgba(8,14,26,0.95)' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a84c' }}>
              {q.category}
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a84c' }}>
              Question {currentQuestion + 1} of 10
            </span>
          </div>
          <div style={{ height: '2px', backgroundColor: '#1a2235', borderRadius: '2px', maxWidth: '680px', margin: '0 auto' }}>
            <div style={{ height: '100%', backgroundColor: '#c9a84c', borderRadius: '2px', width: `${progressPct}%`, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Centered question area */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '130px', paddingBottom: '60px' }}>
          <div style={{ width: '100%', maxWidth: '680px', padding: '0 40px', ...slideStyle }}>

            {/* Eyebrow */}
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '24px' }}>
              {q.category}
            </p>

            {/* Question with typewriter cursor */}
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: '700', color: '#ffffff', lineHeight: '1.35', marginBottom: '40px', minHeight: '120px' }}>
              {typewriterText}
              {!typewriterDone && (
                <span style={{ animation: 'blink 1s step-end infinite', opacity: 1, color: '#c9a84c' }}>|</span>
              )}
            </h2>

            {/* Options */}
            <div>
              {q.options.map((option, i) => {
                const isSelected = selectedOption === i;
                const isHovered  = hoveredOption === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    onMouseEnter={() => setHoveredOption(i)}
                    onMouseLeave={() => setHoveredOption(null)}
                    style={{
                      display: 'block',
                      width: '100%',
                      maxWidth: '560px',
                      background:    isSelected ? 'rgba(201,168,76,0.10)' : isHovered ? 'rgba(201,168,76,0.06)' : 'rgba(13,24,41,0.8)',
                      border:        '1px solid rgba(255,255,255,0.08)',
                      borderLeft:    isSelected || isHovered ? '3px solid #c9a84c' : '3px solid transparent',
                      padding:       '18px 24px',
                      fontSize:      '15px',
                      color:         isSelected || isHovered ? '#ffffff' : '#c8cdd8',
                      borderRadius:  '4px',
                      marginBottom:  '12px',
                      cursor:        'pointer',
                      transition:    'all 0.15s ease',
                      textAlign:     'left',
                      fontFamily:    "'Space Grotesk', sans-serif",
                      opacity:       optionsVisible[i] ? 1 : 0,
                      transform:     optionsVisible[i] ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Back */}
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                style={{ marginTop: '16px', background: 'none', border: 'none', color: '#4a5568', fontSize: '13px', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── VIEW 1: Lead capture ─────────────────────────────────────────
  if (currentStep === 1) {
    return (
      <div style={{ ...bgBase, justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '480px', padding: '0 40px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '700', color: '#ffffff', lineHeight: '1.1', marginBottom: '16px' }}>
            Almost there.
          </h2>
          <p style={{ fontSize: '16px', color: '#9aa0b0', lineHeight: '1.6', marginBottom: '36px' }}>
            Enter your details to receive your personalized AI Readiness Report.
          </p>

          <form onSubmit={handleSubmitUserData}>
            {[
              { key: 'firstName', label: 'First Name',   type: 'text'  },
              { key: 'company',   label: 'Company',      type: 'text'  },
              { key: 'email',     label: 'Work Email',   type: 'email' },
            ].map(f => (
              <input
                key={f.key}
                required
                type={f.type}
                placeholder={f.label}
                value={userData[f.key]}
                onChange={e => setUserData({ ...userData, [f.key]: e.target.value })}
                onFocus={() => setFocusedField(f.key)}
                onBlur={() => setFocusedField(null)}
                style={fieldStyle(focusedField === f.key)}
              />
            ))}

            <select
              required
              value={userData.companySize}
              onChange={e => setUserData({ ...userData, companySize: e.target.value })}
              onFocus={() => setFocusedField('size')}
              onBlur={() => setFocusedField(null)}
              style={{ ...fieldStyle(focusedField === 'size'), appearance: 'none', marginBottom: '24px', color: userData.companySize ? '#ffffff' : '#9aa0b0' }}
            >
              <option value="">Company Size</option>
              <option value="1-10">1–10</option>
              <option value="11-50">11–50</option>
              <option value="51-200">51–200</option>
              <option value="201-500">201–500</option>
              <option value="500+">500+</option>
            </select>

            <button
              type="submit"
              style={{ backgroundColor: '#c9a84c', color: '#080e1a', padding: '14px 32px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em', borderRadius: '3px', border: 'none', cursor: 'pointer', width: '100%', fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.35)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Get My Report
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── VIEW 2: Loading ──────────────────────────────────────────────
  if (currentStep === 2) {
    return (
      <div style={{ ...bgBase, justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', animation: 'spin 3s linear infinite', marginBottom: '28px' }}>
            <Logo size={64} />
          </div>
          <p style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c' }}>
            Analyzing your readiness profile...
          </p>
        </div>
      </div>
    );
  }

  // ── VIEW 3: Results ──────────────────────────────────────────────
  if (currentStep === 3) {

    // Error state
    if (error || !results) {
      return (
        <div style={{ ...bgBase, justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 40px' }}>
            <p style={{ color: '#ffffff', fontSize: '20px', marginBottom: '24px', lineHeight: '1.5' }}>
              Unable to process your assessment. Please try again.
            </p>
            <button
              onClick={resetAssessment}
              style={{ backgroundColor: '#c9a84c', color: '#080e1a', padding: '14px 32px', fontSize: '13px', fontWeight: '600', borderRadius: '3px', border: 'none', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.35)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    const score    = results.score;
    const readiness = getReadiness(score);

    return (
      <div style={{ ...bgBase, overflowY: 'auto' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '100px 40px 80px' }}>

          {/* Readiness level */}
          <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '16px' }}>
            Your Result
          </p>
          <p style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '700', color: readiness.color, lineHeight: '1', marginBottom: '12px' }}>
            {readiness.label}
          </p>
          <p style={{ marginBottom: '32px', lineHeight: '1' }}>
            <span style={{ fontSize: '48px', fontWeight: '700', color: '#ffffff' }}>{score}</span>
            <span style={{ fontSize: '22px', color: '#9aa0b0', fontWeight: '400', marginLeft: '8px' }}>/ 40</span>
          </p>
          <p style={{ fontSize: '24px', fontWeight: '600', color: '#ffffff', lineHeight: '1.35', marginBottom: '56px' }}>
            {results.headline}
          </p>

          {/* Priority recommendations */}
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '24px' }}>
            Priority Recommendations
          </p>
          <div style={{ marginBottom: '56px' }}>
            {results.priority_recommendations.slice(0, 3).map((rec, i) => (
              <div key={i} style={{ borderLeft: '3px solid #c9a84c', paddingLeft: '20px', marginBottom: '28px' }}>
                <p style={{ fontSize: '12px', color: '#c9a84c', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {String(i + 1).padStart(2, '0')} · {rec.timeline}
                </p>
                <p style={{ fontSize: '16px', color: '#e8eaf0', lineHeight: '1.6' }}>
                  {rec.action}
                </p>
              </div>
            ))}
          </div>

          {/* Logos Nova note */}
          <div style={{ border: '1px solid rgba(201,168,76,0.3)', borderLeft: '3px solid #c9a84c', padding: '28px 28px 28px 28px', marginBottom: '48px', borderRadius: '4px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '12px' }}>
              How Logos Nova Can Help
            </p>
            <p style={{ fontSize: '15px', color: '#c8cdd8', lineHeight: '1.7' }}>
              {results.logos_nova_note}
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{ backgroundColor: '#c9a84c', color: '#080e1a', padding: '14px 32px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.04em', borderRadius: '3px', display: 'inline-block', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.35)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Schedule a Consultation
            </Link>
            <button
              onClick={resetAssessment}
              style={{ background: 'transparent', color: '#9aa0b0', padding: '14px 24px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }
}
