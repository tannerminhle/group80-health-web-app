import React from "react"
import { VegaEmbed } from "react-vega"

export default function VegaChart({ spec, scale = 0.85 }) {
  if (!spec) return <div style={{ padding: 12, color: "#666" }}>Loading chart...</div>

  // IMPORTANT:
  // Some of our Vega-Lite specs contain hard-coded dimensions internally
  // (e.g. BMI uses `y2: 350`). If we mutate spec.width/spec.height, those
  // hard-coded values can become inconsistent and visuals may look wrong.
  // So we keep the spec unchanged and scale the rendered output via CSS.
  const safeScale = typeof scale === "number" && scale > 0 ? scale : 0.85
  const baseWidth = typeof spec.width === "number" ? spec.width : 700
  const baseHeight = typeof spec.height === "number" ? spec.height : 300

  // Extra room for title/legend that may render outside the nominal height.
  const extra = 90
  const wrapperHeight = Math.max(140, Math.round(baseHeight * safeScale + extra))

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        height: `${wrapperHeight}px`,
        overflowX: "hidden",
        overflowY: "visible",
      }}
    >
      <div
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          transform: `scale(${safeScale})`,
          transformOrigin: "top left",
        }}
      >
        <VegaEmbed spec={spec} />
      </div>
    </div>
  )
}

