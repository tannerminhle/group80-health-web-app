import React, { useEffect, useMemo, useState } from "react"
import {
  getBmiChart,
  getBloodPressureRiskChart,
  getGlucoseRiskChart,
  getHeartRateRiskChart,
  getWeightHeightChart,
} from "../api/api"
import VegaChart from "../common/components/VegaChart"
import Card from "../common/components/Card"

function toNullableNumber(input) {
  if (input === null || input === undefined) return null
  const trimmed = String(input).trim()
  if (!trimmed) return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}

export default function Dashboard() {
  const [bmiInput, setBmiInput] = useState("")
  const [systolicInput, setSystolicInput] = useState("")
  const [diastolicInput, setDiastolicInput] = useState("")
  const [weightInput, setWeightInput] = useState("")
  const [heightInput, setHeightInput] = useState("")
  const [glucoseInput, setGlucoseInput] = useState("")
  const [heartRateInput, setHeartRateInput] = useState("")

  const [charts, setCharts] = useState({
    bmi: null,
    bloodPressureRisk: null,
    weightHeight: null,
    glucoseRisk: null,
    heartRateRisk: null,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // AI state
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState("")
  const [aiResult, setAiResult] = useState("")

  const inputStyle = {
    border: "1px solid #DADDE5",
    borderRadius: 10,
    padding: "8px 10px",
    outline: "none",
    width: "100%",
    fontSize: 13,
  }

  const labelStyle = { display: "flex", flexDirection: "column", gap: 6 }
  const labelTextStyle = { fontSize: 12, color: "#5B6475" }

  const requestParams = useMemo(() => {
    return {
      bmi: toNullableNumber(bmiInput),
      systolic: toNullableNumber(systolicInput),
      diastolic: toNullableNumber(diastolicInput),
      weight: toNullableNumber(weightInput),
      height: toNullableNumber(heightInput),
      glucose: toNullableNumber(glucoseInput),
      heartRate: toNullableNumber(heartRateInput),
    }
  }, [
    bmiInput,
    systolicInput,
    diastolicInput,
    weightInput,
    heightInput,
    glucoseInput,
    heartRateInput,
  ])

  async function loadCharts() {
    setLoading(true)
    setError("")
    try {
      const [
        bmi,
        bloodPressureRisk,
        weightHeight,
        glucoseRisk,
        heartRateRisk,
      ] = await Promise.all([
        getBmiChart(requestParams.bmi),
        getBloodPressureRiskChart(requestParams.systolic, requestParams.diastolic),
        getWeightHeightChart(requestParams.weight, requestParams.height),
        getGlucoseRiskChart(requestParams.glucose),
        getHeartRateRiskChart(requestParams.heartRate),
      ])
      setCharts({ bmi, bloodPressureRisk, weightHeight, glucoseRisk, heartRateRisk })
    } catch (e) {
      setError(e?.message || "Failed to load charts")
    } finally {
      setLoading(false)
    }
  }

  async function loadAiInsights() {
    setAiLoading(true)
    setAiError("")
    setAiResult("")
    try {
      const res = await fetch("/api/groq/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestParams),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const data = await res.json()
      setAiResult(data.recommendation)
    } catch (e) {
      setAiError(e.message || "Failed to get AI recommendations")
    } finally {
      setAiLoading(false)
    }
  }

  useEffect(() => {
    loadCharts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit(e) {
    e.preventDefault()
    loadCharts()
  }

  return (
    <div style={{ padding: 16, fontFamily: "Arial, sans-serif", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Health Dashboard</h1>
        <p style={{ margin: "8px 0 0 0", color: "#5B6475", fontSize: 13 }}>
          Enter your metrics to compare your values against a population distribution.
        </p>
      </div>

      <Card style={{ marginBottom: 18 }}>
        <form onSubmit={onSubmit}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Basic Health Metrics</h2>
            <p style={{ margin: "6px 0 0 0", color: "#5B6475", fontSize: 13 }}>
              Leave any field blank to use default chart settings.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginTop: 14 }}>
            <label style={labelStyle}>
              <span style={labelTextStyle}>BMI</span>
              <input style={inputStyle} value={bmiInput} onChange={(e) => setBmiInput(e.target.value)} placeholder="e.g. 24.5" />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Weight (kg)</span>
              <input style={inputStyle} value={weightInput} onChange={(e) => setWeightInput(e.target.value)} placeholder="e.g. 70" />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Height (cm)</span>
              <input style={inputStyle} value={heightInput} onChange={(e) => setHeightInput(e.target.value)} placeholder="e.g. 170" />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Systolic (mmHg)</span>
              <input style={inputStyle} value={systolicInput} onChange={(e) => setSystolicInput(e.target.value)} placeholder="e.g. 120" />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Diastolic (mmHg)</span>
              <input style={inputStyle} value={diastolicInput} onChange={(e) => setDiastolicInput(e.target.value)} placeholder="e.g. 80" />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Glucose (mg/dL)</span>
              <input style={inputStyle} value={glucoseInput} onChange={(e) => setGlucoseInput(e.target.value)} placeholder="e.g. 105" />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Heart Rate (bpm)</span>
              <input style={inputStyle} value={heartRateInput} onChange={(e) => setHeartRateInput(e.target.value)} placeholder="e.g. 70" />
            </label>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#2563EB",
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "10px 14px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Loading..." : "Analyze Health Data"}
            </button>
            {error ? <span style={{ color: "crimson", fontSize: 13 }}>{error}</span> : null}
          </div>
        </form>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Card>
          <VegaChart spec={charts.bmi} scale={0.95} />
        </Card>
        <Card>
          <VegaChart spec={charts.bloodPressureRisk} scale={0.95} />
        </Card>
        <Card>
          <VegaChart spec={charts.weightHeight} scale={0.95} />
        </Card>
        <Card>
          <VegaChart spec={charts.glucoseRisk} scale={0.95} />
        </Card>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div style={{ minWidth: 260 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Heart Rate Risk Zones</h2>
              <p style={{ margin: "8px 0 0 0", color: "#5B6475", fontSize: 13, lineHeight: 1.5 }}>
                The chart colors show broad resting heart-rate zones (beats per minute).
                This is for general awareness, not a diagnosis.
              </p>
              <ul style={{ margin: "10px 0 0 18px", color: "#334155", fontSize: 13, lineHeight: 1.6 }}>
                <li><strong>Bradycardia</strong>: typically <strong>&lt; 60 bpm</strong></li>
                <li><strong>Normal</strong>: about <strong>60–100 bpm</strong></li>
                <li><strong>Tachycardia</strong>: typically <strong>&gt; 100 bpm</strong></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <VegaChart spec={charts.heartRateRisk} scale={0.95} />
          </div>
        </Card>

        {/* AI Insights Card */}
        <Card>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>🤖 AI Health Insights</h2>
          <p style={{ margin: "6px 0 12px 0", color: "#5B6475", fontSize: 13 }}>
            Personalized suggestions based on your metrics. Not a medical diagnosis — always consult a healthcare professional.
          </p>

          <button
            type="button"
            onClick={loadAiInsights}
            disabled={aiLoading}
            style={{
              background: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "10px 18px",
              fontWeight: 700,
              cursor: aiLoading ? "not-allowed" : "pointer",
              fontSize: 14,
            }}
          >
            {aiLoading ? "Getting AI Insights..." : "Get AI Recommendations"}
          </button>

          {aiError && (
            <p style={{ color: "crimson", fontSize: 13, marginTop: 10 }}>{aiError}</p>
          )}

          {aiResult && (
            <div style={{
              marginTop: 14,
              background: "#F0F7FF",
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 14,
              color: "#1E3A5F",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
            }}>
              {aiResult}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}