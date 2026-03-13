const credentials = [
  { label: 'Cornell MBA' },
  { label: 'Marine Corps Veteran' },
  { label: 'PMP' },
  { label: 'SDVOSB Certified' },
];

export default function AboutPage() {
  return (
    <>
      {/* ── SECTION 1: HERO ──────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #0d1829 0%, #080e1a 60%)',
          padding: '120px 0 100px',
        }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 40px)',
            borderLeft: '3px solid #c9a84c',
            paddingLeft: '32px',
          }}
        >
          {/* Eyebrow */}
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
            About
          </p>

          {/* Headline line 1 */}
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 6vw, 88px)',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: '1.1',
              marginBottom: '24px',
            }}
          >
            AI is the most powerful force multiplier of our era.
          </p>

          {/* Headline line 2 */}
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(24px, 5vw, 72px)',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: '1.1',
              marginBottom: '36px',
            }}
          >
            We help organizations use it.
          </p>

          {/* Subline */}
          <p
            style={{
              fontSize: '18px',
              color: '#9aa0b0',
              lineHeight: '1.6',
            }}
          >
            Founded by a Marine Corps veteran and Cornell MBA with Fortune 50
            management experience.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: TRUST MARKS ───────────────────────────── */}
      <section
        style={{
          backgroundColor: '#0a1220',
          borderTop: '1px solid rgba(201, 168, 76, 0.2)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
          padding: '80px 0',
        }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '40px',
            flexWrap: 'nowrap',
          }}
        >
          {/* Cornell */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #b31b1b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#b31b1b', fontSize: '28px', fontWeight: '700', fontFamily: 'Space Grotesk' }}>C</span>
            </div>
            <p
              style={{
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9aa0b0',
              }}
            >
              Cornell University
            </p>
          </div>

          {/* USMC */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#c9a84c', fontSize: '14px', fontWeight: '700', fontFamily: 'Space Grotesk', letterSpacing: '0.05em' }}>USMC</span>
            </div>
            <p
              style={{
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9aa0b0',
              }}
            >
              U.S. Marine Corps
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CREDENTIALS ───────────────────────────── */}
      <section style={{ backgroundColor: '#080e1a', padding: '80px 0' }}>
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 40px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {credentials.flatMap((c, i) => {
            const tag = (
              <span
                key={c.label}
                style={{
                  fontSize: 'clamp(10px, 2.5vw, 11px)',
                  fontWeight: '500',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#9aa0b0',
                }}
              >
                {c.label}
              </span>
            );
            if (i < credentials.length - 1) {
              return [
                tag,
                <span
                  key={c.label + '-sep'}
                  style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#c9a84c',
                    opacity: 0.6,
                    flexShrink: 0,
                    margin: '0 clamp(8px, 3vw, 28px)',
                  }}
                />,
              ];
            }
            return [tag];
          })}
        </div>
      </section>
    </>
  );
}
