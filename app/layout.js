import './globals.css';
import NavBar from './components/NavBar';
import Logo from './components/Logo';
import Link from 'next/link';

export const metadata = {
  title: 'Logos Nova LLC | AI Automation Consulting',
  description:
    'AI Automation Consulting for Federal and Commercial Clients. SDVOSB Certified. Austin, Texas.',
};

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/assessment', label: 'Assessment' },
  { href: '/contact', label: 'Contact' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#080e1a', minHeight: '100vh' }}>
        <NavBar />
        <main style={{ paddingTop: '64px' }}>{children}</main>

        <footer
          style={{
            backgroundColor: '#080e1a',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Main footer row */}
          <div
            style={{
              maxWidth: '1160px',
              margin: '0 auto',
              padding: '56px 40px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Logo lockup */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Logo size={24} />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '12px',
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    color: '#ffffff',
                  }}
                >
                  LOGOS NOVA
                </span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#9aa0b0', lineHeight: '1.6', marginTop: '16px' }}>
              AI automation consulting for federal and commercial clients.
            </p>
            <p style={{ fontSize: '12px', color: '#9aa0b0', lineHeight: '1.6', marginTop: '8px' }}>
              Austin, Texas.
            </p>

            {/* Nav links */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '40px' }}>
              {footerLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ fontSize: '12px', color: '#9aa0b0' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p
            style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: '12px',
              textAlign: 'center',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              maxWidth: '1160px',
              margin: '24px auto 0',
              padding: '24px 40px 32px',
            }}
          >
            © 2026 Logos Nova LLC. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
