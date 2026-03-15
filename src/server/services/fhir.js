const FHIR_BASE = process.env.FHIR_BASE_URL || "https://r4.smarthealthit.org";

async function getObservationsByCode(code, count = 100) {

  const res = await fetch(`${FHIR_BASE}/Observation?code=${code}&_count=${count}`);
  const bundle = await res.json();

  if (!bundle.entry) return [];

  const values = [];

  bundle.entry.forEach(e => {

    const r = e.resource;

    // normal observation
    if (r.valueQuantity && typeof r.valueQuantity.value === "number") {
      values.push(r.valueQuantity.value);
    }

    // blood pressure component observations
    if (r.component) {
      r.component.forEach(c => {

        const compCode = c.code?.coding?.[0]?.code;

        if (compCode === code && c.valueQuantity?.value !== undefined) {
          values.push(c.valueQuantity.value);
        }

      });
    }

  });

  return values.filter(v => typeof v === "number");
}

async function getBMIObservations(count = 100) {
  return getObservationsByCode("39156-5", count);
}

module.exports = {
  getObservationsByCode,
  getBMIObservations
};
