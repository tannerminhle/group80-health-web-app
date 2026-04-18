const express = require("express");
const router = express.Router();
const { getHealthRecommendations } = require("../services/groqService");

router.post("/recommendations", async (req, res) => {
    try {
        const healthData = req.body;

        if (!healthData || Object.keys(healthData).length === 0) {
            return res.status(400).json({ error: "Health data is required" });
        }

        const recommendations = await getHealthRecommendations(healthData);
        res.json(recommendations);

    } catch (error) {
        console.error("Groq API error:", error.message);
        res.status(500).json({ error: "Failed to get AI recommendations" });
    }
});

module.exports = router;