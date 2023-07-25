import React from "react"

const CalculatorRange = ({ title, onChange, value, min, max, show = true }) => (
  <div className={`w-full ${!show && "opacity-10 select-none"}`}>
    <h3 className="pb-1">{title}</h3>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className={`range ${!show && "cursor-no-drop"}`}
      disabled={!show}
    />
  </div>
)

export default CalculatorRange
