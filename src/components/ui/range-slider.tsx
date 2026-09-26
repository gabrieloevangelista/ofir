"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface RangeSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onValueChange: (val: [number, number]) => void
  formatValue?: (val: number) => string
  className?: string
  label?: string
  unit?: string
}

export function RangeSlider({
  min,
  max,
  step = 50,
  value,
  onValueChange,
  formatValue = (v) => v.toLocaleString("pt-BR"),
  className,
  label,
  unit,
}: RangeSliderProps) {
  const [minVal, setMinVal] = useState(value[0])
  const [maxVal, setMaxVal] = useState(value[1])
  const minValRef = useRef(minVal)
  const maxValRef = useRef(maxVal)
  const rangeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMinVal(value[0])
    setMaxVal(value[1])
    minValRef.current = value[0]
    maxValRef.current = value[1]
  }, [value])

  // Convert value to percentage
  const getPercent = useCallback(
    (val: number) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  )

  // Update visual track
  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxVal)

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`
      rangeRef.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, maxVal, getPercent])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxVal - step)
    setMinVal(val)
    minValRef.current = val
    onValueChange([val, maxVal])
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minVal + step)
    setMaxVal(val)
    maxValRef.current = val
    onValueChange([minVal, val])
  }

  return (
    <div className={cn("w-full flex flex-col gap-2.5 select-none", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span>{label}</span>
          <span className="text-primary font-mono text-xs font-bold">
            {formatValue(minVal)} — {formatValue(maxVal)}
          </span>
        </div>
      )}

      {/* Dual Thumb Range Track */}
      <div className="relative flex items-center w-full h-7">
        {/* Base Background Track */}
        <div className="absolute w-full h-1.5 bg-secondary rounded-none border border-border/80" />

        {/* Active Range Highlight (Gold) */}
        <div
          ref={rangeRef}
          className="absolute h-1.5 bg-primary rounded-none transition-none"
        />

        {/* Left Thumb Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className={cn(
            "pointer-events-none absolute w-full h-1.5 bg-transparent appearance-none z-20 cursor-pointer",
            "[&::-webkit-slider-runnable-track]:bg-transparent",
            "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:rounded-none",
            "[&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary",
            "[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md",
            "[&::-webkit-slider-thumb]:hover:scale-115 [&::-webkit-slider-thumb]:active:scale-95",
            "[&::-webkit-slider-thumb]:transition-transform",
            "[&::-moz-range-track]:bg-transparent",
            "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4.5",
            "[&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:bg-background",
            "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary",
            "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md",
            minVal > max - 100 && "z-30"
          )}
          style={{ background: "transparent" }}
        />

        {/* Right Thumb Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className={cn(
            "pointer-events-none absolute w-full h-1.5 bg-transparent appearance-none z-20 cursor-pointer",
            "[&::-webkit-slider-runnable-track]:bg-transparent",
            "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:rounded-none",
            "[&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary",
            "[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md",
            "[&::-webkit-slider-thumb]:hover:scale-115 [&::-webkit-slider-thumb]:active:scale-95",
            "[&::-webkit-slider-thumb]:transition-transform",
            "[&::-moz-range-track]:bg-transparent",
            "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4.5",
            "[&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:bg-background",
            "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary",
            "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
          )}
          style={{ background: "transparent" }}
        />
      </div>

      {/* Min & Max Quick Reference / Inputs */}
      <div className="flex items-center justify-between gap-2 pt-0.5 text-xs">
        <div className="flex items-center gap-1 bg-muted/40 px-2 py-1 border border-border/60">
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">Min:</span>
          <span className="font-bold text-foreground font-mono">{formatValue(minVal)}</span>
        </div>
        <div className="flex items-center gap-1 bg-muted/40 px-2 py-1 border border-border/60">
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">Max:</span>
          <span className="font-bold text-foreground font-mono">{formatValue(maxVal)}</span>
        </div>
      </div>
    </div>
  )
}
