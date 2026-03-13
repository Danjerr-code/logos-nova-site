'use client';

import Link from 'next/link';

const services = [
  {
    num: '01',
    name: 'AI Readiness Assessment',
    desc: 'We evaluate your data infrastructure, process maturity, and technical readiness to produce a prioritized AI implementation roadmap your team can act on immediately.',
  },
  {
    num: '02',
    name: 'Agentic AI Workflow Design and Deployment',
    desc: 'We design and deploy autonomous AI agent systems that handle research, drafting, routing, and decision support without constant human intervention.',
  },
  {
    num: '03',
    name: 'Process Automation and Lean Optimization',
    desc: 'Combining Lean Six Sigma methodology with AI tooling, we identify waste, redesign workflows, and implement automation that compounds over time.',
  },
  {
    num: '04',
    name: 'Federal Proposal Development',
    desc: 'AI-augmented proposal development for federal opportunities — faster turnaround, higher quality, and precise alignment to evaluation criteria.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── SECTION 1: HERO ──────────────────────────────────── */}
      <section style={{ backgroundColor: '#080e1a', padding: '120px 0 100px' }}>
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 40px',
          }}
        >
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
            Services
          </p>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: '1.1',
              maxWidth: '800px',
            }}
          >
            Enterprise-grade AI consulting for federal and commercial clients.
          </h1>
        </div>
      </section>

      {/* ── SECTION 2: SERVICE CARDS ─────────────────────────── */}
      <section style={{ backgroundColor: '#080e1a', padding: '0 0 100px' }}>
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 40px',
            gap: '24px',
          }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {services.map((s) => (
            <div
              key={s.num}
              style={{
                backgroundColor: '#0d1829',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: '3px solid #c9a84c',
                padding: '40px',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#c9a84c',
                }}
              >
                {s.num}
              </p>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#ffffff',
                  lineHeight: '1.2',
                  marginTop: '16px',
                }}
              >
                {s.name}
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#8892a4',
                  lineHeight: '1.7',
                  marginTop: '12px',
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: BOTTOM CTA ────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#080e1a',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '100px 0',
        }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 40px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '32px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Not sure where to start?
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#9aa0b0',
              lineHeight: '1.6',
              marginBottom: '36px',
            }}
          >
            Take our free AI Readiness Assessment and get a personalized report
            in minutes.
          </p>
          <Link
            href="/assessment"
            style={{
              backgroundColor: '#c9a84c',
              color: '#080e1a',
              padding: '14px 32px',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '0.04em',
              borderRadius: '3px',
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
            Get Your Free Assessment
          </Link>
        </div>
      </section>
    </>
  );
}
