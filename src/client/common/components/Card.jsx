import React from "react"

export default function Card({ children, style }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E6E8EF",
        borderRadius: 16,
        boxShadow: "0 6px 20px rgba(16, 24, 40, 0.06)",
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

