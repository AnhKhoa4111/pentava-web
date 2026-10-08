import React, { useEffect, useRef, type ReactNode } from "react"

export interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: "blue" | "purple" | "green" | "red" | "orange"
  size?: "sm" | "md" | "lg"
  width?: string | number
  height?: string | number
  customSize?: boolean // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { base: 215, spread: 200 },
  purple: { base: 265, spread: 260 },
  green: { base: 140, spread: 180 },
  red: { base: 0, spread: 200 },
  orange: { base: 45, spread: 180 },
}

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "green",
  size = "md",
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2))
        cardRef.current.style.setProperty(
          "--xp",
          (x / window.innerWidth).toFixed(2)
        )
        cardRef.current.style.setProperty("--y", y.toFixed(2))
        cardRef.current.style.setProperty(
          "--yp",
          (y / window.innerHeight).toFixed(2)
        )
      }
    }

    document.addEventListener("pointermove", syncPointer)
    return () => document.removeEventListener("pointermove", syncPointer)
  }, [])

  const { base, spread } = glowColorMap[glowColor]

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return "" // Let className or inline styles handle sizing
    }
    return sizeMap[size]
  }

  const getInlineStyles = (): React.CSSProperties => {
    const baseStyles: Record<string, string | number> = {
      "--base": base,
      "--spread": spread,
      "--radius": "24",
      "--border": "2",
      "--backdrop": "rgba(255, 255, 255, 0.95)",
      "--backup-border": "rgba(0, 0, 0, 0.12)",
      "--size": "260",
      "--outer": "1",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 260) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 140) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 65) * 1%) / var(--bg-spot-opacity, 0.12)), transparent
      )`,
      backgroundColor: "var(--backdrop, #ffffff)",
      backgroundSize:
        "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      backgroundAttachment: "fixed",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
      touchAction: "pan-y",
    }

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height
    }

    return baseStyles as React.CSSProperties
  }

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask-clip: padding-box, border-box;
      -webkit-mask-composite: xor;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.85) calc(var(--spotlight-size) * 0.85) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 140) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 0.85)), transparent 100%
      );
      filter: brightness(1.6);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 0.8)), transparent 100%
      );
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          rounded-3xl
          relative 
          p-6 
          backdrop-blur-[6px]
          transition-transform duration-200
          ${className}
        `}
      >
        <div ref={innerRef} data-glow />
        {children}
      </div>
    </>
  )
}

export { GlowCard, GlowCard as SpotlightCard }
export default GlowCard
