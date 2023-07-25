import React from "react"

const CalculatorInput = ({ title, onChange, value, show = true }) => (
  <div className="w-full">
    <h3 className={`pb-1 ${!show && "opacity-10 select-none"}`}>{title}</h3>
    <input
      type="number"
      min={0}
      value={value}
      onChange={onChange}
      placeholder="Type number"
      disabled={!show}
      className="input input-bordered w-full disabled:text-neutral max-w-[200px]"
    />
  </div>
)

export default CalculatorInput
