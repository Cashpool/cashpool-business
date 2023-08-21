import React from "react"

const CalculatorInput = ({
  title,
  onChange,
  value,
  placeholder,
  type = "number",
  show = true,
  titleMode = false,
}) => (
  <div className="form-control w-full">
    {title && (
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
    )}
    <input
      type={type}
      min={0}
      value={value}
      onChange={onChange}
      placeholder={placeholder || (type === "text" ? "Aa..." : "123")}
      disabled={!show}
      className={`input  ${
        titleMode ? "text-center" : "bg-light"
      } w-full placeholder:text-dark disabled:text-neutral transition-all `}
    />
  </div>
)

export default CalculatorInput
