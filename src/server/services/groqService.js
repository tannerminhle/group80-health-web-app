const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


const MODEL = "llama-3.3-70b-versatile";

async function getHealthRecommendations(healthData) {
    const { bmi, systolic, diastolic, glucose, heartRate, weight, height, age, gender } = healthData;

    const prompt = `
You are a professional health advisor. Based on the following user health data, provide:
1. Health risks (list up to 3 key risks)
2. Exercise recommendations (specific, actionable)
3. Diet recommendations (specific, actionable)

User Health Data:
- BMI: ${bmi ?? "N/A"}
- Blood Pressure: ${systolic ?? "N/A"}/${diastolic ?? "N/A"} mmHg
- Blood Glucose: ${glucose ?? "N/A"} mg/dL
- Heart Rate: ${heartRate ?? "N/A"} bpm
- Weight: ${weight ?? "N/A"} kg
- Height: ${height ?? "N/A"} cm
- Age: ${age ?? "N/A"}
- Gender: ${gender ?? "N/A"}

Respond in JSON format:
{
  "healthRisks": ["risk1", "risk2", "risk3"],
  "exerciseRecommendations": ["tip1", "tip2", "tip3"],
  "dietRecommendations": ["tip1", "tip2", "tip3"]
}
`;

    const response = await groq.chat.completions.create({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.5,
    });

    return JSON.parse(response.choices[0].message.content);
}

module.exports = { getHealthRecommendations };