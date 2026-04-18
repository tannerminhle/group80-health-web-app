const express = require("express");
const router = express.Router();
router.use(express.json()); 

const populationCache = require("../services/populationCache");
const { computePopulationStats } = require("../utils/stats");

// Charts
const bmiChart = require("../charts/bmiChart");
const bloodPressureRiskChart = require("../charts/bloodPressureRiskChart");
const weightHeightChart = require("../charts/weightHeightChart");
const glucoseRiskChart = require("../charts/glucoseRiskChart");
const heartRateRiskChart = require("../charts/heartRateRiskChart");

router.get("/health", (req, res) => {
    res.json({
        status: "API running"
    });
});

router.get("/vega/bmi", (req, res) => {
    const userBMI = req.query.value ? Number(req.query.value) : null;

    const population = populationCache.getPopulation();
    const values = population.bmi || [];

    const stats = computePopulationStats(values, userBMI);

    res.json(
        bmiChart(values, userBMI, stats)
    );
});

router.get("/vega/blood-pressure-risk", (req, res) => {
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

router.get("/vega/heart-rate",(req,res)=>{
	const value=req.query.value?Number(req.query.value):70;
	res.json(
		heartRateRiskChart(value)
	);
});

const { getHealthRecommendations } = require("../services/groq");

router.post("/groq/recommend", async (req, res) => {
    try {
        const metrics = req.body;
        const recommendation = await getHealthRecommendations(metrics);
        res.json({ recommendation });
    } catch (e) {
        console.error("Groq error:", e.message);
        res.status(500).json({ error: "Failed to get AI recommendations" });
    }
});

module.exports = router;
