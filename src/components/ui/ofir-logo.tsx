import React from "react"
import { cn } from "@/lib/utils"

export interface OfirLogoProps extends React.SVGAttributes<SVGSVGElement> {
  variant?: "gold" | "gold-gradient" | "white" | "black" | "current"
  layout?: "icon" | "horizontal" | "vertical" | "full" | "wordmark"
  showSubtitle?: boolean
  subtitle?: string
}

export function OfirEmblem({
  variant = "gold-gradient",
  className,
  ...props
}: {
  variant?: "gold" | "gold-gradient" | "white" | "black" | "current"
  className?: string
} & React.SVGAttributes<SVGSVGElement>) {
  const id = React.useId()
  const gradientId = `ofir-gold-${id}`

  const fill =
    variant === "gold-gradient"
      ? `url(#${gradientId})`
      : variant === "gold"
      ? "#C5A059"
      : variant === "white"
      ? "#FFFFFF"
      : variant === "black"
      ? "#111111"
      : "currentColor"

  return (
    <svg
      viewBox="0 0 144 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      {variant === "gold-gradient" && (
        <defs>
          <linearGradient id={gradientId} x1="10%" y1="5%" x2="90%" y2="95%">
            <stop offset="0%" stopColor="#EED59B" />
            <stop offset="25%" stopColor="#D9B76A" />
            <stop offset="55%" stopColor="#C5A059" />
            <stop offset="85%" stopColor="#AA823E" />
            <stop offset="100%" stopColor="#8F6A2B" />
          </linearGradient>
        </defs>
      )}

      {/* Dual-D Circular Split Emblem (Mathematically precise circle R=68, center at 72,72, gap=8) */}
      {/* Left Semicircular Half */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M 68 4.12
          A 68 68 0 0 0 68 139.88
          L 68 4.12 Z
          M 52 26.17
          A 50 50 0 0 0 52 117.83
          L 52 26.17 Z
        "
        fill={fill}
      />

      {/* Right Semicircular Half */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M 76 4.12
          A 68 68 0 0 1 76 139.88
          L 76 4.12 Z
          M 92 26.17
          A 50 50 0 0 1 92 117.83
          L 92 26.17 Z
        "
        fill={fill}
      />
    </svg>
  )
}

export function OfirLogo({
  variant = "gold-gradient",
  layout = "horizontal",
  showSubtitle = false,
  subtitle = "Marketplace de Obras",
  className,
}: OfirLogoProps) {
  const textColorClass =
    variant === "gold" || variant === "gold-gradient"
      ? "text-primary"
      : variant === "white"
      ? "text-white"
      : variant === "black"
      ? "text-foreground"
      : "text-current"

  if (layout === "icon") {
    return <OfirEmblem variant={variant} className={className} />
  }

  if (layout === "vertical" || layout === "full") {
    return (
      <div className={cn("inline-flex flex-col items-center gap-2", className)}>
        <OfirEmblem variant={variant} className="size-14" />
        <span
          className={cn(
            "font-sans font-medium text-lg tracking-[0.35em] pl-[0.35em] uppercase leading-none",
            textColorClass
          )}
        >
          OFIR
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            {subtitle}
          </span>
        )}
      </div>
    )
  }

  if (layout === "wordmark") {
    return (
      <span
        className={cn(
          "font-sans font-medium text-xl tracking-[0.35em] pl-[0.35em] uppercase leading-none",
          textColorClass,
          className
        )}
      >
        OFIR
      </span>
    )
  }

  // Default: layout="horizontal"
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <OfirEmblem variant={variant} className="size-8 shrink-0" />
      <div className="flex flex-col justify-center">
        <span
          className={cn(
            "font-sans font-semibold text-lg sm:text-xl tracking-[0.32em] pl-[0.32em] uppercase leading-none",
            textColorClass
          )}
        >
          OFIR
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase mt-1">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}
