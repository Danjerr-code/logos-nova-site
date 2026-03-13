'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/assessment', label: 'Assessment' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: 'rgba(8, 14, 26, 0.90)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 40px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo lockup */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Logo size={28} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.1em',
                color: '#ffffff',
              }}
            >
              LOGOS NOVA
            </span>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '36px' }}>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: '400',
                  color: hoveredLink === l.href ? '#ffffff' : '#9aa0b0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={() => setHoveredLink(l.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/assessment"
              style={{
                border: '1px solid rgba(201,168,76,0.25)',
                color: '#c9a84c',
                padding: '7px 16px',
                fontSize: '12px',
                letterSpacing: '0.05em',
                borderRadius: '3px',
                backgroundColor: ctaHovered ? 'rgba(201,168,76,0.15)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                setCtaHovered(true);
                e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.35)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                setCtaHovered(false);
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Assessment
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '20px',
              cursor: 'pointer',
              lineHeight: 1,
            }}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            backgroundColor: '#0d1626',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            zIndex: 99,
            padding: '24px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ color: '#9aa0b0', fontSize: '14px' }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            onClick={() => setOpen(false)}
            style={{ color: '#c9a84c', fontSize: '14px' }}
          >
            Get Assessment
          </Link>
        </div>
      )}
    </>
  );
}
