import Link from 'next/link';

const services = [
  {
    title: 'AI Readiness Assessment and Implementation Roadmapping',
    body: 'We evaluate your data infrastructure, process maturity, and technical readiness to produce a prioritized AI implementation roadmap your team can act on immediately.',
  },
  {
    title: 'Agentic AI Workflow Design and Deployment',
    body: 'We design and deploy autonomous AI agent systems that handle research, drafting, routing, and decision support without constant human intervention.',
  },
  {
    title: 'Process Automation and Lean Optimization',
    body: 'Combining Lean Six Sigma methodology with AI tooling, we identify waste, redesign workflows, and implement automation that compounds over time.',
  },
  {
    title: 'Proposal Development and Documentation Support',
    body: 'AI-augmented proposal development for federal and commercial opportunities — faster turnaround, higher quality, and precise alignment to evaluation criteria.',
  },
  {
    title: 'Data Analytics, Reporting, and Decision Intelligence',
    body: 'We build analytics infrastructure that transforms raw operational data into dashboards and insights that drive better decisions at every level.',
  },
  {
    title: 'AI Governance and Compliance Readiness',
    body: 'We help organizations build the frameworks, policies, and documentation required to adopt AI responsibly — with specific expertise in federal compliance requirements including NIST AI RMF and CMMC.',
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-navy min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-3">Our Services</h1>
        <p className="text-gold text-lg mb-14">
          Enterprise-grade AI consulting for federal and commercial clients.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="border border-gold/30 rounded-lg p-8 flex flex-col gap-5"
            >
              <div className="text-gold text-2xl font-bold">
                0{i + 1}
              </div>
              <h3 className="text-white text-xl font-bold">{s.title}</h3>
              <p className="text-white/70 leading-relaxed flex-1">{s.body}</p>
              <Link
                href="/contact"
                className="border border-gold text-gold text-sm font-medium px-5 py-2 rounded hover:bg-gold hover:text-navy transition-colors w-fit"
              >
                Schedule a Consultation
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
