'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const fieldStyle = (name) => ({
    background: 'rgba(255,255,255,0.06)',
    border: focused === name ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
    borderRadius: '4px',
    padding: '14px 18px',
    color: '#ffffff',
    fontSize: '15px',
    width: '100%',
    marginBottom: '16px',
    outline: 'none',
  });

  return (
    <section style={{ backgroundColor: '#080e1a', minHeight: '100vh', paddingTop: '140px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 40px' }}>

        {/* Hero */}
        <p style={{ fontSize: '11px', fontWeight: '500', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '16px' }}>
          Contact
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: '700', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '60px' }}>
          Let&apos;s Talk
        </h1>

        {/* Two-column layout */}
        <div className="contact-layout" style={{ display: 'flex', gap: '0', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Left: Form — 60% */}
          <div className="contact-form-col" style={{ flex: '0 0 60%', minWidth: '280px' }}>
            {submitted ? (
              <p style={{ fontSize: '18px', color: '#c9a84c', fontFamily: "'Space Grotesk', sans-serif", fontWeight: '500' }}>
                Thank you. We&apos;ll be in touch within 24 hours.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  required
                  placeholder="First Name"
                  style={fieldStyle('firstName')}
                  onFocus={() => setFocused('firstName')}
                  onBlur={() => setFocused(null)}
                />
                <input
                  placeholder="Company"
                  style={fieldStyle('company')}
                  onFocus={() => setFocused('company')}
                  onBlur={() => setFocused(null)}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  style={fieldStyle('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
                <textarea
                  required
                  placeholder="Message"
                  style={{ ...fieldStyle('message'), height: '160px', resize: 'vertical' }}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#c9a84c',
                    color: '#080e1a',
                    padding: '14px 32px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.04em',
                    borderRadius: '3px',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
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
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Text — 40% */}
          <div className="desktop-only" style={{ flex: '0 0 40%', minWidth: '240px', paddingLeft: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ color: '#ffffff', fontSize: '18px', lineHeight: '1.5', marginBottom: '12px' }}>Federal and commercial engagements welcome.</p>
            <p style={{ color: '#ffffff', fontSize: '18px', lineHeight: '1.5', marginBottom: '12px' }}>SDVOSB set-aside opportunities prioritized.</p>
            <p style={{ color: '#ffffff', fontSize: '18px', lineHeight: '1.5', marginBottom: '12px' }}>Response within 24 hours.</p>
            <p style={{ fontSize: '14px', color: '#8892a4', lineHeight: '1.7', marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              For federal procurement inquiries, please include your agency, NAICS code, and anticipated award timeline.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
