module.exports = function (points, userSystolic, userDiastolic) {
    const layers = [
        {
            data: { values: points },
            mark: {
                type: "circle",
                size: 180,
                opacity: 0.5,
                color: "#4A90E2"
            },
            encoding: {
                x: {
                    field: "diastolic",
                    type: "quantitative",
                    title: "Diastolic (mmHg)"
                },
                y: {
                    field: "systolic",
                    type: "quantitative",
                    title: "Systolic (mmHg)"
                },
                tooltip: [
                    { field: "systolic", title: "Systolic" },
                    { field: "diastolic", title: "Diastolic" }
                ]
            }
        }
    ];
    if (userSystolic && userDiastolic) {
        layers.push({
            data: {
                values: [{
                    systolic: userSystolic,
                    diastolic: userDiastolic
                }]
            },
            mark: {
                type: "circle",
                size: 350,
                color: "#E53935"
            },
            encoding: {
                x: { field: "diastolic", type: "quantitative" },
                y: { field: "systolic", type: "quantitative" },
                tooltip: [
                    { field: "systolic", title: "Your Systolic" },
                    { field: "diastolic", title: "Your Diastolic" }
                ]
            }
        });
    }

    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        title: "Blood Pressure Comparison",
        width: 500,
        height: 400,
        layer: layers
    };
};
