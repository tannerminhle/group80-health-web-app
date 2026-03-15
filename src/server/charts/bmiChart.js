function buildChart(values, userBMI, stats = {}) {
  const safeValues = values || [];

  const dataset = safeValues.map(v => ({ bmi: v }));

  const safeStats = {
    percentile: stats.percentile ?? null,
    mean: stats.mean ?? 0,
    median: stats.median ?? 0,
    diffMean: stats.diffMean ?? 0,
    diffMedian: stats.diffMedian ?? 0
  };

  return {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "title": "BMI Population Comparison",
    "width": 700,
    "height": 350,
    "layer": [
      {
        "data": {
          "values": [
            { start: 0, end: 18.5, zone: "Underweight" },
            { start: 18.5, end: 24.9, zone: "Healthy" },
            { start: 24.9, end: 30, zone: "Overweight" },
            { start: 30, end: 50, zone: "Obese" }
          ]
        },
        "mark": { "type": "rect", "opacity": 0.18 },
        "encoding": {
          "x": { "field": "start", "type": "quantitative" },
          "x2": { "field": "end" },
          "y": { "value": 0 },
          "y2": { "value": 350 },
          "color": {
            "field": "zone",
            "type": "nominal",
            "scale": {
              "domain": [
                "Underweight",
                "Healthy",
                "Overweight",
                "Obese"
              ],
              "range": [
                "#FBC02D",
                "#43A047",
                "#FB8C00",
                "#E53935"
              ]
            },
            "legend": { "title": "BMI Category" }
          }
        }
      },
      {
        "data": { "values": dataset },
        "transform": [
          { "density": "bmi", "bandwidth": 0.6 }
        ],
        "mark": { "type": "area", "color": "#1E88E5", "opacity": 0.45 },
        "encoding": {
          "x": {
            "field": "value",
            "type": "quantitative",
            "title": "BMI"
          },
          "y": {
            "field": "density",
            "type": "quantitative",
            "title": "Population Density"
          },
          "tooltip": [
            { "field": "value", "title": "BMI" },
            { "field": "density", "title": "Population Density" }
          ]
        }
      },
      ...(userBMI ? [
        {

          "data": { "values": [{ bmi: userBMI }] },

          "mark": { "type": "rule", "color": "black", "strokeWidth": 3 },

          "encoding": {
            "x": { "field": "bmi", "type": "quantitative" }
          }

        },
        {
          "data": {
            "values": [{
              bmi: userBMI,
              percentile: safeStats.percentile,
              mean: safeStats.mean.toFixed(2),
              median: safeStats.median.toFixed(2),
              diffMean: safeStats.diffMean,
              diffMedian: safeStats.diffMedian
            }]
          },
          "mark": { "type": "point", "size": 250, "color": "black" },
          "encoding": {
            "x": { "field": "bmi", "type": "quantitative" },
            "y": { "value": 0 },
            "tooltip": [
              { "field": "bmi", "title": "Your BMI" },
              { "field": "percentile", "title": "Population Percentile" },
              { "field": "mean", "title": "Population Mean" },
              { "field": "median", "title": "Population Median" },
              { "field": "diffMean", "title": "Difference from Mean" },
              { "field": "diffMedian", "title": "Difference from Median" }
            ]
          }
        }
      ] : [])
    ]
  };
}

module.exports = buildChart;
