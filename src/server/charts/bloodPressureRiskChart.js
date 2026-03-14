module.exports = function (systolic, diastolic) {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        title: "Blood Pressure Risk Zones",
        width: 450,
        height: 400,
        layer: [
            {
                data: {
                    values: [
                        { x1: 0, x2: 200, y1: 140, y2: 200 },
                        { x1: 90, x2: 200, y1: 0, y2: 200 }
                    ]
                },
                mark: {
                    type: "rect",
                    color: "#E53935",
                    opacity: 0.35
                },
                encoding: {
                    x: { field: "x1", type: "quantitative", title: "Diastolic (mmHg)" },
                    x2: { field: "x2" },
                    y: { field: "y1", type: "quantitative", title: "Systolic (mmHg)" },
                    y2: { field: "y2" }
                }
            },
            {
                data: {
                    values: [
                        { x1: 80, x2: 90, y1: 0, y2: 140 },
                        { x1: 0, x2: 80, y1: 130, y2: 140 }
                    ]
                },
                mark: {
                    type: "rect",
                    color: "#FB8C00",
                    opacity: 0.35
                },
                encoding: {
                    x: { field: "x1", type: "quantitative" },
                    x2: { field: "x2" },

                    y: { field: "y1", type: "quantitative" },
                    y2: { field: "y2" }
                }
            },
            {
                data: {
                    values: [
                        { x1: 0, x2: 80, y1: 120, y2: 130 }
                    ]
                },
                mark: {
                    type: "rect",
                    color: "#FDD835",
                    opacity: 0.35
                },
                encoding: {
                    x: { field: "x1", type: "quantitative" },
                    x2: { field: "x2" },

                    y: { field: "y1", type: "quantitative" },
                    y2: { field: "y2" }
                }
            },
            {
                data: {
                    values: [
                        { x1: 0, x2: 80, y1: 0, y2: 120 }
                    ]
                },
                mark: {
                    type: "rect",
                    color: "#4CAF50",
                    opacity: 0.35
                },
                encoding: {
                    x: { field: "x1", type: "quantitative" },
                    x2: { field: "x2" },

                    y: { field: "y1", type: "quantitative" },
                    y2: { field: "y2" }
                }
            },
            {
                data: {
                    values: [
                        {
                            systolic: systolic,
                            diastolic: diastolic
                        }
                    ]
                },
                mark: {
                    type: "circle",
                    size: 350,
                    color: "black"
                },
                encoding: {
                    x: { field: "diastolic", type: "quantitative" },
                    y: { field: "systolic", type: "quantitative" },

                    tooltip: [
                        { field: "systolic", title: "Your Systolic (mmHg)" },
                        { field: "diastolic", title: "Your Diastolic (mmHg)" }
                    ]
                }
            }
        ]
    }
}
