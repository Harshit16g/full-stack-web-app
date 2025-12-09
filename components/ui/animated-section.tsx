"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    animation?: "fade-in-up" | "scale-in" | "fade-in"
    delay?: number
    threshold?: number
}

export function AnimatedSection({
    children,
    animation = "fade-in-up",
    delay = 0,
    threshold = 0.1,
    className,
    ...props
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [threshold])

    const animationClass = {
        "fade-in-up": "animate-fade-in-up",
        "scale-in": "animate-scale-in",
        "fade-in": "animate-fade-in-up",
    }[animation]

    return (
        <div
            ref={ref}
            className={cn(
                "transition-opacity duration-500",
                isVisible ? animationClass : "opacity-0",
                className
            )}
            style={{ animationDelay: `${delay}s` }}
            {...props}
        >
            {children}
        </div>
    )
}
