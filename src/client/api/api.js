const API_BASE = "/api"

function buildQuery(params) {
  const qs = new URLSearchParams()
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return
    qs.set(key, String(value))
  })
  const query = qs.toString()
  return query ? `?${query}` : ""
}

async function getVegaSpec(path, params) {
  const url = `${API_BASE}${path}${buildQuery(params)}`

  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`)
  }

  // Backend returns a Vega/Vega-Lite spec JSON object
  return res.json()
}

export async function getBmiChart(userBMI) {
  return getVegaSpec("/vega/bmi", { value: userBMI })
}

export async function getBloodPressureRiskChart(systolic, diastolic) {
  return getVegaSpec("/vega/blood-pressure-risk", {
    systolic,
    diastolic,
  })
}

export async function getWeightHeightChart(weight, height) {
  return getVegaSpec("/vega/weight-height", { weight, height })
}

export async function getGlucoseRiskChart(value) {
  return getVegaSpec("/vega/glucose", { value })
}

export async function getHeartRateRiskChart(value) {
  return getVegaSpec("/vega/heart-rate", { value })
}

