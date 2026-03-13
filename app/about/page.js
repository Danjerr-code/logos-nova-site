const credentials = [
  'Cornell MBA | Corporate Finance',
  'Marine Corps Veteran | 2011–2017',
  'Project Management Professional (PMP)',
  'Lean Six Sigma Black Belt',
  'Certified Scrum Master (CSM)',
  'Google Advanced Data Analytics',
  'UPenn AI for Business',
  'SDVOSB Certified',
];

export default function AboutPage() {
  return (
    <>
      {/* Founder Bio */}
      <section className="bg-navy text-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Built by a Veteran.{' '}
            <span className="text-gold">Powered by AI.</span>
          </h1>
          <div className="space-y-6 text-white/80 leading-relaxed text-lg">
            <p>
              Danjerr Presson is the founder of Logos Nova LLC, a
              Service-Disabled Veteran-Owned Small Business based in Austin,
              Texas. A Marine Corps veteran with six years of service
              (2011–2017), Danjerr brings operational discipline and
              mission-driven focus to every client engagement.
            </p>
            <p>
              After the Marine Corps, he earned his MBA from Cornell University
              with a concentration in Corporate Finance, and went on to serve as
              a Finance Manager at Johnson &amp; Johnson supporting a $40 billion
              divestiture. He founded Logos Nova to apply enterprise-grade
              strategic thinking and cutting-edge AI automation to the problems
              that matter most — for both federal agencies and commercial clients
              ready to modernize.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-light py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-navy text-2xl font-bold mb-10 text-center">
            Credentials &amp; Certifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {credentials.map((c) => (
              <div
                key={c}
                className="bg-white border border-gold rounded-lg p-5 text-center text-navy text-sm font-medium shadow-sm"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-xl md:text-2xl font-semibold leading-relaxed italic">
            &ldquo;Our north star is building AI-powered systems that give
            organizations an unfair advantage — faster decisions, leaner
            operations, and the ability to do more with less.&rdquo;
          </p>
        </div>
      </section>
    </>
  );
}
