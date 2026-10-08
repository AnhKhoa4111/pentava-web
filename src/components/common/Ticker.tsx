import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  className = "",
  duration = 1.5,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(startValue + (value - startValue) * easeProgress)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

interface ActivityTickerProps {
  items: string[]
  className?: string
  speed?: number
}

export function ActivityTicker({
  items,
  className = "",
  speed = 22,
}: ActivityTickerProps) {
  const duplicated = [...items, ...items]

  return (
    <div className={`overflow-hidden py-2 ${className}`}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex w-max items-center gap-8 whitespace-nowrap"
      >
        {duplicated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-extrabold text-black shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse" />
            <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
