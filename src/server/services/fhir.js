const FHIR_BASE = process.env.FHIR_BASE_URL || "https://r4.smarthealthit.org";

async function getObservationsByCode(code, count = 100) {
  try {
    const res = await fetch(
      `${FHIR_BASE}/Observation?code=${code}&_count=${count}`
    );
    if (!res.ok) return [];
    const bundle = await res.json().catch(() => ({}));

    if (!bundle.entry) return [];

    return bundle.entry
      .map((e) => e.resource?.valueQuantity?.value)
      .filter((v) => typeof v === "number");
  } catch (err) {
    // If the FHIR sandbox is unreachable (DNS/network/temporary outage),
    // keep the server running by returning no observations.
    console.error("FHIR fetch failed:", err?.message || err);
    return [];
  }
}

async function getBMIObservations(count = 100) {
  return getObservationsByCode("39156-5", count);
}

module.exports = {
  getBMIObservations,
  getObservationsByCode
}
