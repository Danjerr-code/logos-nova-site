import Anthropic from '@anthropic-ai/sdk';

export async function POST(request) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  try {
    const { answers, score, userData } = await request.json();

    const answersText = answers
      .map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.selected}`)
      .join('\n\n');

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are an AI readiness consultant at Logos Nova LLC, a Service-Disabled Veteran-Owned AI consulting firm based in Austin, Texas.

Analyze these assessment results and return ONLY valid JSON with no additional text, markdown, or code blocks.

Assessment Score: ${score}/40
Company: ${userData.company}
Company Size: ${userData.companySize}

Answers:
${answersText}

Return exactly this JSON structure:
{
  "readiness_level": "Early Stage or Developing or Advancing or AI-Ready",
  "score": ${score},
  "score_max": 40,
  "headline": "one sentence summary of their situation",
  "top_strengths": ["strength 1", "strength 2"],
  "critical_gaps": ["gap 1", "gap 2", "gap 3"],
  "priority_recommendations": [
    {
      "action": "specific action to take",
      "timeline": "0-30 days or 30-90 days or 90-180 days",
      "impact": "High or Medium or Low"
    },
    {
      "action": "specific action to take",
      "timeline": "0-30 days or 30-90 days or 90-180 days",
      "impact": "High or Medium or Low"
    },
    {
      "action": "specific action to take",
      "timeline": "0-30 days or 30-90 days or 90-180 days",
      "impact": "High or Medium or Low"
    }
  ],
  "logos_nova_note": "one paragraph on how Logos Nova specifically can help this organization based on their results"
}`,
        },
      ],
    });

    const responseText = message.content[0].text;
    const analysis = JSON.parse(responseText);

    return Response.json({ success: true, analysis });
  } catch (error) {
    console.error('Assessment API error:', error);
    return Response.json(
      { success: false, error: 'Assessment failed' },
      { status: 500 }
    );
  }
}
