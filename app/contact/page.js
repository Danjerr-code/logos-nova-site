'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-navy min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Let&apos;s Talk
        </h1>
        <p className="text-gold text-lg mb-14 max-w-xl">
          Federal and commercial engagements welcome. SDVOSB set-aside
          opportunities prioritized. Response within 24 hours.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="text-gold text-xl font-semibold">
                Thank you! We&apos;ll be in touch within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">
                      First Name
                    </label>
                    <input
                      required
                      className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">
                      Last Name
                    </label>
                    <input
                      required
                      className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">
                    Company
                  </label>
                  <input className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-gold" />
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-white/10 border border-gold/30 rounded px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gold text-navy font-bold px-8 py-3 rounded hover:opacity-90 transition-opacity w-fit"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info block */}
          <div className="text-white/70 space-y-8">
            <div>
              <p className="text-gold font-semibold mb-1">Location</p>
              <p>Austin, Texas</p>
            </div>
            <div>
              <p className="text-gold font-semibold mb-1">Availability</p>
              <p>Federal and Commercial</p>
            </div>
            <div>
              <p className="text-gold font-semibold mb-1">Certifications</p>
              <p>SDVOSB, PMP, Lean Six Sigma Black Belt</p>
            </div>
            <div className="border border-gold/30 rounded-lg p-5">
              <p className="text-sm leading-relaxed">
                <span className="text-gold font-semibold">
                  For federal procurement inquiries,
                </span>{' '}
                please include your agency, NAICS code, and anticipated award
                timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
