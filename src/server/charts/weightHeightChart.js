module.exports = function (points, userWeight, userHeight) {
    const layers = [
        {
            data: { values: points },

            mark: {
                type: "circle",
                size: 120,
                opacity: 0.45,
                color: "#4A90E2"
            },

            encoding: {

                x: {
                    field: "height",
                    type: "quantitative",
                    title: "Height (cm)"
                },

                y: {
                    field: "weight",
                    type: "quantitative",
                    title: "Weight (kg)"
                },

                tooltip: [
                    { field: "height", title: "Height (cm)" },
                    { field: "weight", title: "Weight (kg)" }
                ]
            }
        }

    ];

    if (userWeight && userHeight) {
        layers.push({
            data: {
                values: [{
                    weight: userWeight,
                    height: userHeight
                }]
            },

            mark: {
                type: "circle",
                size: 300,
                color: "#E53935"
            },

            encoding: {

                x: { field: "height", type: "quantitative" },

                y: { field: "weight", type: "quantitative" },

                tooltip: [
                    { field: "height", title: "Your Height" },
                    { field: "weight", title: "Your Weight" }
                ]
            }
        });
    }

    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

        title: "Weight vs Height Population",

        width: 500,
        height: 400,

        layer: layers
    };
};
