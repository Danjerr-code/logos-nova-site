import { Resend } from 'resend';

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const {
      firstName,
      company,
      email,
      companySize,
      score,
      readinessLevel,
      criticalGaps,
    } = await request.json();

    const timestamp = new Date().toISOString();

    // Email to Danjerr
    await resend.emails.send({
      from: 'Logos Nova <notifications@logosnova.com>',
      to: 'danjerr@logosnova.com',
      subject: `New Assessment Lead: ${company} | Score: ${score}/40 | ${readinessLevel}`,
      html: `
        <h2>New AI Readiness Assessment Lead</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Time</strong></td>
              <td style="padding:8px;border:1px solid #ddd">${timestamp}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>First Name</strong></td>
              <td style="padding:8px;border:1px solid #ddd">${firstName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Company</strong></td>
              <td style="padding:8px;border:1px solid #ddd">${company}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td>
              <td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Company Size</strong></td>
              <td style="padding:8px;border:1px solid #ddd">${companySize}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Score</strong></td>
              <td style="padding:8px;border:1px solid #ddd">${score}/40</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Readiness Level</strong></td>
              <td style="padding:8px;border:1px solid #ddd">${readinessLevel}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Critical Gaps</strong></td>
              <td style="padding:8px;border:1px solid #ddd">${criticalGaps.join(', ')}</td></tr>
        </table>
        <br>
        <p><strong>Follow up within 24 hours.</strong></p>
        <p><a href="mailto:${email}">Reply directly to lead</a></p>
      `,
    });

    // Confirmation email to lead
    await resend.emails.send({
      from: 'Danjerr Presson | Logos Nova <danjerr@logosnova.com>',
      to: email,
      subject: `Your AI Readiness Report - ${company}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0a1628;padding:24px;text-align:center">
            <h1 style="color:#c9a84c;margin:0">Logos Nova LLC</h1>
            <p style="color:#ffffff;margin:8px 0 0">AI Automation Consulting</p>
          </div>
          <div style="padding:32px">
            <p>Hi ${firstName},</p>
            <p>Thank you for completing the Logos Nova AI Readiness Assessment.</p>
            <p>Your organization scored <strong>${score}/40</strong> —
            placing you at the <strong>${readinessLevel}</strong> stage
            of AI readiness.</p>
            <p>I personally review every assessment and will follow up
            within 24 hours with thoughts specific to your situation
            and how Logos Nova can help you move forward.</p>
            <p>In the meantime, if you have an immediate question or
            want to schedule a conversation sooner, reply directly
            to this email.</p>
            <br>
            <p>— Danjerr Presson<br>
            Founder, Logos Nova LLC<br>
            Service-Disabled Veteran-Owned Small Business | Austin, Texas</p>
          </div>
          <div style="background:#f4f4f4;padding:16px;text-align:center;font-size:12px;color:#8a8a8a">
            <p style="margin:0">Logos Nova LLC | SDVOSB Certified | Austin, Texas</p>
            <p style="margin:4px 0 0">© 2025 Logos Nova LLC</p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return Response.json(
      { success: false, error: 'Lead capture failed' },
      { status: 500 }
    );
  }
}
