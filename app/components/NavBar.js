'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/assessment', label: 'Assessment' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-navy px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Logo size={36} />
          <span style={{ color: '#c9a84c', fontWeight: '600', fontSize: '18px' }}>
            Logos Nova
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white hover:text-gold transition-colors text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white text-2xl leading-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-5 pb-2 px-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white hover:text-gold text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
