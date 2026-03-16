const FHIR_BASE = process.env.FHIR_BASE_URL || "https://r4.smarthealthit.org";

async function getObservationsByCode(code, count = 100) {
  const res = await fetch(`${FHIR_BASE}/Observation?code=${code}&_count=${count}`);
  const bundle = await res.json();

  if (!bundle.entry) return [];

  return bundle.entry
    .map(e => e.resource.valueQuantity?.value)
    .filter(v => typeof v === "number");
}

async function getBMIObservations(count = 100) {
  return getObservationsByCode("39156-5", count);
}

module.exports = {
  getBMIObservations,
  getObservationsByCode
}
