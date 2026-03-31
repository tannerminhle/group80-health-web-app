const fhir = require("./fhir");

const population = {
    bmi: [],
    heartRate: [],
    bodyFat: [],
    leanMass: [],
    weight: [],
    height: []
};

function linspace(start, end, n) {
  if (n <= 1) return [start];
  return Array.from({ length: n }, (_, i) => start + ((end - start) * i) / (n - 1));
}

function applyFallback(arr, fallbackArr) {
  return Array.isArray(arr) && arr.length > 1 ? arr : fallbackArr;
}

async function loadPopulation() {
    console.log("Loading FHIR population data...");

    // Fallback values are used if the SMART Health IT sandbox is unreachable.
    const fallback = {
      bmi: linspace(18, 34, 20).map((v) => Number(v.toFixed(1))),
      heartRate: linspace(55, 100, 20).map((v) => Math.round(v)),
      bodyFat: linspace(10, 35, 20),
      leanMass: linspace(40, 80, 20),
      weight: linspace(50, 120, 20),
      height: linspace(145, 195, 20),
    };

    const [
      bmi,
      heartRate,
      bodyFat,
      leanMass,
      weight,
      height,
    ] = await Promise.all([
      fhir.getObservationsByCode("39156-5", 200),
      fhir.getObservationsByCode("8867-4", 200),
      fhir.getObservationsByCode("41982-0", 200),
      fhir.getObservationsByCode("41981-2", 200),
      fhir.getObservationsByCode("29463-7", 200),
      fhir.getObservationsByCode("8302-2", 200),
    ]);

    population.bmi = applyFallback(bmi, fallback.bmi);
    population.heartRate = applyFallback(heartRate, fallback.heartRate);
    population.bodyFat = applyFallback(bodyFat, fallback.bodyFat);
    population.leanMass = applyFallback(leanMass, fallback.leanMass);
    population.weight = applyFallback(weight, fallback.weight);
    population.height = applyFallback(height, fallback.height);

    console.log("FHIR population loaded (or fallback values used)");
}

function getPopulation() {
    return population;
}

module.exports = {
    loadPopulation,
    getPopulation
};
