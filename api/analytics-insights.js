export default async function handler(req, res) {
  try {
    const {
      studyHours,
      streak,
      productivity,
      weakSubjects,
      strongSubjects,
      quizzesCompleted,
      accuracy,
      recentActivity
    } = req.body;

    const prompt = `
You are an elite AI academic performance coach.

Analyze this student's data and generate:
- productivity insights
- weak point analysis
- strengths
- burnout detection
- improvement tips
- motivational feedback
- study optimization strategy
- exam preparation recommendations

Student Data:
${JSON.stringify({
  studyHours,
  streak,
  productivity,
  weakSubjects,
  strongSubjects,
  quizzesCompleted,
  accuracy,
  recentActivity
}, null, 2)}

Return ONLY valid JSON in this format:

{
  "summary": "",
  "motivation": "",
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "burnoutRisk": "",
  "focusAreas": [],
  "dailyMission": "",
  "productivityScoreExplanation": ""
}
`;

    const response = await fetch(
      "https://api.x.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: "grok-3-mini",
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content:
                "You are an elite AI study mentor and analytics engine. Always return clean JSON only."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await response.json();

    let content = data.choices?.[0]?.message?.content || "{}";

    content = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(content);

    res.status(200).json(parsed);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Analytics AI failed",
      details: err.message
    });

  }
}
