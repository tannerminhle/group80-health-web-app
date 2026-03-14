const express = require("express")
const router = express.Router()

const stats = require("../utils/stats")
const fhir = require("../services/fhir")
const buildChart = require("../charts/bmiChart")

router.get("/health", (req,res)=>{
  res.json({status:"API running"})
})

router.get("/vega/bmi", async (req,res)=>{

  try {

    const count = req.query.count ? Number(req.query.count) : 100
    const userBMI = req.query.bmi ? Number(req.query.bmi) : null

    const values = await fhir.getBMIObservations(count)

    const populationStats = stats.computePopulationStats(values, userBMI)

    const chart = buildChart(values, userBMI, populationStats)

    res.json(chart)

  } catch(err) {

    res.status(500).json({error:err.message})

  }

})

module.exports = router