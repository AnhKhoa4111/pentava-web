import { useEffect, useState, useRef, useCallback } from "react"

interface ScrambleTextProps {
  text: string
  className?: string
  scrambleSpeed?: number
  triggerOnHover?: boolean
}

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+?"

export default function ScrambleText({
  text,
  className = "",
  scrambleSpeed = 35,
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const isScramblingRef = useRef(false)
  const intervalRef = useRef<number | null>(null)

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return
    isScramblingRef.current = true

    let iteration = 0
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) {
              return text[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        isScramblingRef.current = false
      }

      iteration += 1 / 2
    }, scrambleSpeed)
  }, [text, scrambleSpeed])

  useEffect(() => {
    // Tự động scramble 1 lần khi component xuất hiện
    scramble()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [scramble])

  return (
    <span
      onMouseEnter={triggerOnHover ? scramble : undefined}
      className={`inline-block font-mono cursor-default select-none ${className}`}
    >
      {displayText}
    </span>
  )
}
