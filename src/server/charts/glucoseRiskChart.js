module.exports = function (value) {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        title: "Glucose Risk Zones",
        width: 500,
        height: 120,
        layer: [
            {
                data: {
                    values: [
                        { start: 0,   end: 70,  zone: "Low" },
                        { start: 70,  end: 100, zone: "Normal" },
                        { start: 100, end: 126, zone: "Prediabetes" },
                        { start: 126, end: 200, zone: "Diabetes" }
                    ]
                },
                mark: {
                    type: "rect",
                    opacity: 0.65
                },
                encoding: {
                    x:  {
                        field: "start",
                        type: "quantitative",
                        title: "Glucose (mg/dL)"
                    },
                    x2: { field: "end" },
                    color: {
                        field: "zone",
                        type: "nominal",
                        scale: {
                            range: [
                                "#FBC02D",  // Low
                                "#43A047",  // Normal
                                "#FB8C00",  // Prediabetes
                                "#E53935"   // Diabetes
                            ]
                        }
                    }
                }
            },
            {
                data: {
                    values: [{ glucose: value }]
                },
                mark: {
                    type: "rule",
                    strokeWidth: 4,
                    color: "black"
                },
                encoding: {
                    x: {
                        field: "glucose",
                        type: "quantitative"
                    }
                }
            }
        ],
        config: {
            axisY: { labels: false, ticks: false, domain: false }
        }
    };
};
