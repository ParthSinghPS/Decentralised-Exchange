"use client"

import type React from "react"

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function AmountInput({ value, onChange, placeholder = "0.0", disabled = false }: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    // Allow only numbers and decimal point
    if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue)
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className="flex-1 bg-transparent text-2xl font-medium placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    />
  )
}
