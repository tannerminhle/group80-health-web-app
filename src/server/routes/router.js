const express = require("express");

const router = express.Router();

const populationCache = require("../services/populationCache");

// Charts
const bmiChart = require("../charts/bmiChart");
const bloodPressureChart = require("../charts/bloodPressureChart");
const bloodPressureRiskChart = require("../charts/bloodPressureRiskChart");
const weightHeightChart = require("../charts/weightHeightChart");
const glucoseRiskChart = require("../charts/glucoseRiskChart");

router.get("/health", (req, res) => {
    res.json({
        status: "API running"
    });
});

router.get("/vega/bmi", (req, res) => {
    const userBMI = req.query.value ? Number(req.query.value) : null;

    const population = populationCache.getPopulation();

    const values = population.bmi;

    res.json(
        bmiChart(values, userBMI)
    );
});

router.get("/vega/blood-pressure", (req, res) => {
    const userSystolic = req.query.systolic ? Number(req.query.systolic) : null;
    const userDiastolic = req.query.diastolic ? Number(req.query.diastolic) : null;

    const population = populationCache.getPopulation();

    const systolicValues = population.systolic || [];
    const diastolicValues = population.diastolic || [];

    const points = systolicValues
        .map((s, i) => ({
            systolic: s,
            diastolic: diastolicValues[i]
        }))
        .filter(p => p.systolic && p.diastolic);

    res.json(
        bloodPressureChart(points, userSystolic, userDiastolic)
    );
});

router.get("/vega/bp-risk", (req, res) => {
    const systolic = req.query.systolic ? Number(req.query.systolic) : 120;
    const diastolic = req.query.diastolic ? Number(req.query.diastolic) : 80;

    res.json(
        bloodPressureRiskChart(systolic, diastolic)
    );
});

router.get("/vega/weight-height", (req, res) => {
    const userWeight = req.query.weight ? Number(req.query.weight) : null;
    const userHeight = req.query.height ? Number(req.query.height) : null;

    const population = populationCache.getPopulation();

    const weights = population.weight;
    const heights = population.height;

    const points = weights
        .map((w, i) => ({
            weight: w,
            height: heights[i]
        }))
        .filter(p => p.weight && p.height);

    res.json(
        weightHeightChart(points, userWeight, userHeight)
    );
});

router.get("/vega/glucose", (req, res) => {
    const value = req.query.value ? Number(req.query.value) : 100;

    res.json(
        glucoseRiskChart(value)
    );
});

module.exports = router;
