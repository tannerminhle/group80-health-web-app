require("dotenv").config();
const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getHealthRecommendations(metrics) {
    const { bmi, systolic, diastolic, weight, height, glucose, heartRate } = metrics;

    const prompt = `You are a helpful health assistant. Based on the following user health metrics, provide brief, non-diagnostic health maintenance suggestions. Be empathetic and concise (3-4 bullet points max).

User Metrics:
- BMI: ${bmi ?? "not provided"}
- Weight: ${weight ?? "not provided"} kg
- Height: ${height ?? "not provided"} cm
- Systolic Blood Pressure: ${systolic ?? "not provided"} mmHg
- Diastolic Blood Pressure: ${diastolic ?? "not provided"} mmHg
- Fasting Glucose: ${glucose ?? "not provided"} mg/dL
- Resting Heart Rate: ${heartRate ?? "not provided"} bpm

Provide general wellness suggestions based on these values. Always remind the user to consult a healthcare professional for medical advice.`;

    const completion = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
    });

    return completion.choices[0].message.content;
}

module.exports = { getHealthRecommendations };