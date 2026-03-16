const fhir = require("./fhir");

const population = {
    bmi: [],
    heartRate: [],
    bodyFat: [],
    leanMass: [],
    weight: [],
    height: []
};

async function loadPopulation() {
    console.log("Loading FHIR population data...");

    population.bmi = await fhir.getObservationsByCode("39156-5", 200);
    population.heartRate = await fhir.getObservationsByCode("8867-4", 200);
    population.bodyFat = await fhir.getObservationsByCode("41982-0", 200);
    population.leanMass = await fhir.getObservationsByCode("41981-2", 200);
    population.weight = await fhir.getObservationsByCode("29463-7", 200);
    population.height = await fhir.getObservationsByCode("8302-2", 200);

    console.log("FHIR population loaded");
}

function getPopulation() {
    return population;
}

module.exports = {
    loadPopulation,
    getPopulation
};
