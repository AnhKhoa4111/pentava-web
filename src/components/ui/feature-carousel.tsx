import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CarouselImage {
  src: string
  alt: string
  title?: string
  tag?: string
  desc?: string
}

export interface FeatureCarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  subtitle: string
  images: CarouselImage[]
  eyebrow?: string
  appStoreLink?: string
  googlePlayLink?: string
}

export const HeroSection = React.forwardRef<HTMLDivElement, FeatureCarouselProps>(
  ({ title, subtitle, images, eyebrow, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(
      Math.floor(images.length / 2)
    )

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, [images.length])

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    React.useEffect(() => {
      const timer = setInterval(() => {
        handleNext()
      }, 4000)
      return () => clearInterval(timer)
    }, [handleNext])

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full flex flex-col items-center justify-center overflow-x-hidden bg-transparent text-foreground py-16 px-4 md:py-24",
          className
        )}
        {...props}
      >
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(58,129,87,0.25),rgba(255,255,255,0))]" />
          <div className="absolute bottom-0 right-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,200,87,0.25),rgba(255,255,255,0))]" />
        </div>

        {/* Content */}
        <div className="z-10 flex w-full flex-col items-center text-center space-y-8 md:space-y-12 max-w-[1240px] mx-auto">
          {/* Header Section */}
          <div className="space-y-4 max-w-3xl">
            {eyebrow && (
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#1E7444]">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-gray-900">
              {title}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Main 3D Showcase Section */}
          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
            {/* Carousel 3D Perspective Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
              {images.map((image, index) => {
                const offset = index - currentIndex
                const total = images.length
                let pos = (offset + total) % total
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total
                }

                const isCenter = pos === 0
                const isAdjacent = Math.abs(pos) === 1

                return (
                  <div
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "absolute w-60 h-[360px] sm:w-68 sm:h-[410px] md:w-76 md:h-[460px] transition-all duration-500 ease-in-out cursor-pointer",
                      "flex flex-col items-center justify-center select-none"
                    )}
                    style={{
                      transform: `
                        translateX(${pos * 52}%) 
                        scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                        rotateY(${pos * -12}deg)
                      `,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.6 : 0,
                      filter: isCenter ? "blur(0px)" : "blur(3px)",
                      visibility: Math.abs(pos) > 2 ? "hidden" : "visible",
                    }}
                  >
                    <div className="relative w-full h-full rounded-[36px] border-[6px] border-gray-900 overflow-hidden bg-white shadow-2xl">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full h-full"
                      />
                      {/* Overlay card details */}
                      {(image.title || image.tag) && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-left text-white">
                          {image.tag && (
                            <span className="inline-block rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider mb-1">
                              {image.tag}
                            </span>
                          )}
                          {image.title && (
                            <h3 className="text-base font-black leading-tight text-white line-clamp-1">
                              {image.title}
                            </h3>
                          )}
                          {image.desc && (
                            <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                              {image.desc}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 rounded-full h-11 w-11 z-20 border border-gray-200 bg-white/95 text-gray-800 shadow-md hover:bg-emerald-50 hover:text-[#1E7444] transition-all cursor-pointer"
              onClick={handlePrev}
              aria-label="Previous feature"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 rounded-full h-11 w-11 z-20 border border-emerald-600 bg-[#1E7444] text-white shadow-md hover:bg-[#165a34] transition-all cursor-pointer"
              onClick={handleNext}
              aria-label="Next feature"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none",
                  idx === currentIndex ? "w-8 bg-[#1E7444]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
)

HeroSection.displayName = "HeroSection"

export const FeatureCarousel = HeroSection
