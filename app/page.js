'use client';

import Link from 'next/link';
import GeometricBg from './components/GeometricBg';
import SupernovaCanvas from './components/SupernovaCanvas';

const capabilities = [
  {
    title: 'AI Readiness Assessment',
    desc: 'Data, process, and infrastructure evaluation with prioritized roadmap.',
  },
  {
    title: 'Agentic Workflow Design',
    desc: 'Autonomous AI systems that execute tasks without constant human input.',
  },
  {
    title: 'Process Automation',
    desc: 'Lean methodology meets AI tooling to eliminate waste at the source.',
  },
  {
    title: 'Proposal Development',
    desc: 'AI-augmented federal and commercial proposal writing and review.',
  },
  {
    title: 'Data and Decision Intelligence',
    desc: 'Analytics infrastructure that turns raw data into leadership-ready insight.',
  },
  {
    title: 'AI Governance and Compliance',
    desc: 'NIST AI RMF and CMMC-aligned frameworks for responsible adoption.',
  },
];

const stats = [
  { label: 'Veteran Owned' },
  { label: 'Federal + Commercial' },
  { label: 'SDVOSB Certified' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#080e1a',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <GeometricBg />

        {/* Hero content */}
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 40px',
            paddingTop: '180px',
            paddingBottom: '140px',
            position: 'relative',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {/* Left column — 55% */}
          <div style={{ flex: '0 0 58%', minWidth: 0 }}>

          {/* Label */}
          <p
            style={{
              fontSize: '11px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              marginBottom: '20px',
            }}
          >
            AI Automation Consulting
          </p>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(48px, 6vw, 96px)',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: '1.05',
              maxWidth: '700px',
              marginBottom: '24px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Built for the mission.
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: '18px',
              color: '#c8cdd8',
              maxWidth: '480px',
              lineHeight: '1.7',
              marginBottom: '48px',
            }}
          >
            Federal and commercial AI implementation, from readiness assessment
            to deployed automation.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/assessment"
              style={{
                backgroundColor: '#c9a84c',
                color: '#080e1a',
                padding: '13px 28px',
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.04em',
                borderRadius: '3px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-block',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.35)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Assess Your Readiness
            </Link>
            <Link
              href="/contact"
              style={{
                backgroundColor: 'transparent',
                color: '#e8eaf0',
                padding: '13px 28px',
                fontSize: '13px',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '3px',
                cursor: 'pointer',
                display: 'inline-block',
              }}
            >
              Schedule a Call
            </Link>
          </div>

          {/* Stats row */}
          <div
            style={{
              marginTop: '80px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              flexWrap: 'wrap',
            }}
          >
            {stats.flatMap((s, i) => {
              const label = (
                <span
                  key={s.label}
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9aa0b0',
                  }}
                >
                  {s.label}
                </span>
              );
              if (i < stats.length - 1) {
                return [
                  label,
                  <span
                    key={s.label + '-dot'}
                    style={{
                      display: 'inline-block',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#c9a84c',
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                  />,
                ];
              }
              return [label];
            })}
          </div>

          </div>{/* end left column */}

          {/* Right column — 45%, hidden on mobile */}
          <div
            className="hidden md:flex"
            style={{
              flex: '0 0 42%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SupernovaCanvas />
          </div>

        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#0d1626',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '80px 0',
        }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            gap: '80px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* Left column */}
          <div style={{ flex: '0 0 260px', minWidth: '220px' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                marginBottom: '16px',
              }}
            >
              Capabilities
            </p>
            <h2
              style={{
                fontSize: '36px',
                maxWidth: '300px',
                lineHeight: '1.15',
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#ffffff',
              }}
            >
              What we build and deliver
            </h2>
          </div>

          {/* Right column: 2×3 grid */}
          <div
            style={{
              flex: '1 1 500px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              columnGap: '40px',
            }}
          >
            {capabilities.map((c) => (
              <div
                key={c.title}
                style={{
                  borderTop: '1px solid rgba(201,168,76,0.25)',
                  paddingTop: '20px',
                  marginBottom: '32px',
                }}
              >
                <h3
                  style={{
                    fontSize: '15px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#ffffff',
                    fontWeight: '500',
                    marginBottom: '8px',
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#9aa0b0',
                    lineHeight: '1.6',
                  }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASSESSMENT CTA ───────────────────────────────────── */}
      <section style={{ backgroundColor: '#080e1a', padding: '120px 0' }}>
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '60px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left */}
          <div style={{ flex: '1 1 400px' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                marginBottom: '16px',
              }}
            >
              Free Tool
            </p>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 56px)',
                lineHeight: '1.08',
                marginBottom: '20px',
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#ffffff',
              }}
            >
              Know where you stand.
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: '#9aa0b0',
                maxWidth: '480px',
                lineHeight: '1.7',
                marginBottom: '36px',
              }}
            >
              10 questions. Instant analysis. Personalized recommendations from
              an AI consultant trained on federal and commercial implementation
              patterns.
            </p>
            <Link
              href="/assessment"
              style={{
                backgroundColor: '#c9a84c',
                color: '#080e1a',
                padding: '13px 28px',
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.04em',
                borderRadius: '3px',
                display: 'inline-block',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.35)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start the Assessment
            </Link>
          </div>

          {/* Right: stats */}
          <div
            style={{
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              paddingTop: '8px',
            }}
          >
            {[
              { value: '10', unit: 'Questions' },
              { value: '~4', unit: 'Minutes' },
              { value: '1', unit: 'Instant Report' },
            ].map((s) => (
              <div key={s.unit}>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '36px',
                    fontWeight: '500',
                    color: '#ffffff',
                    lineHeight: '1',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#9aa0b0',
                    marginTop: '6px',
                  }}
                >
                  {s.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
