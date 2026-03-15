function buildChart(value){
	return {
		"$schema":"https://vega.github.io/schema/vega-lite/v5.json",
		"title":"Heart Rate Risk Zones",
		"width":500,
		"height":120,
		"layer":[
			{
				"data":{
					"values":[
						{"start":0,"end":60,"zone":"Bradycardia"},
						{"start":60,"end":100,"zone":"Normal"},
						{"start":100,"end":200,"zone":"Tachycardia"}
					]
				},
				"mark":{"type":"rect","opacity":0.65},
				"encoding":{
					"x":{"field":"start","type":"quantitative","title":"Heart Rate (bpm)"},
					"x2":{"field":"end"},

					"color":{
						"field":"zone",
						"type":"nominal",
						"scale":{
							"range":[
								"#FBC02D",
								"#43A047",
								"#E53935"
							]
						}
					}
				}
			},
			{
				"data":{"values":[{"hr":value}]},

				"mark":{"type":"rule","strokeWidth":4,"color":"black"},

				"encoding":{
					"x":{"field":"hr","type":"quantitative"}
				}
			}

		],
		"config":{
			"axisY":{
				"labels":false,
				"ticks":false,
				"domain":false
			}
		}

	};
}

module.exports=buildChart;
