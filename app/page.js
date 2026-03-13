import Link from 'next/link';
import Logo from './components/Logo';

const capabilities = [
  {
    num: '01',
    title: 'AI Readiness Assessment',
    body: 'We evaluate your data, processes, and infrastructure to identify exactly where AI can deliver value.',
  },
  {
    num: '02',
    title: 'Process Automation',
    body: 'We design and deploy AI-powered workflows that eliminate manual work and compress delivery timelines.',
  },
  {
    num: '03',
    title: 'Federal Consulting',
    body: 'SDVOSB-certified with deep experience navigating federal procurement, compliance, and AI governance requirements.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size={120} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            AI Automation Consulting for Federal and Commercial Clients
          </h1>
          <p className="text-gold text-lg mb-12">
            Service-Disabled Veteran-Owned Small Business | Austin, Texas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assessment"
              className="bg-gold text-navy font-bold px-8 py-3 rounded hover:opacity-90 transition-opacity"
            >
              Assess Your AI Readiness
            </Link>
            <Link
              href="/contact"
              className="border-2 border-gold text-gold font-bold px-8 py-3 rounded hover:bg-gold hover:text-navy transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-navy text-white py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {capabilities.map(({ num, title, body }) => (
            <div key={num} className="border border-gold/30 rounded-lg p-8">
              <div className="text-gold text-3xl font-bold mb-4">{num}</div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-white/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="bg-gold py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-navy text-3xl font-bold mb-4">
            Is Your Organization AI-Ready?
          </h2>
          <p className="text-navy/80 mb-10 text-lg">
            Take our free 10-question assessment and get an instant analysis of
            your AI readiness with prioritized recommendations.
          </p>
          <Link
            href="/assessment"
            className="bg-navy text-white font-bold px-10 py-3 rounded hover:opacity-90 transition-opacity"
          >
            Start Free Assessment
          </Link>
        </div>
      </section>
    </>
  );
}
