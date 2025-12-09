import React from "react"
import { cn } from "@/lib/utils"

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export function Tape({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-32 h-10 opacity-90 drop-shadow-sm", className)}
            {...props}
        >
            <path
                d="M2 15L5 2L195 5L198 18L195 55L5 52L2 15Z"
                fill="rgba(255, 255, 255, 0.4)"
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="1"
            />
            <path
                d="M0 15L10 0L190 3L200 18L195 58L5 55L0 15Z"
                fill="rgba(255, 255, 230, 0.5)"
                style={{ mixBlendMode: "multiply" }}
            />
        </svg>
    )
}

export function PaperClip({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 50 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-8 h-16 drop-shadow-md", className)}
            {...props}
        >
            <path
                d="M35 15V75C35 83.2843 28.2843 90 20 90C11.7157 90 5 83.2843 5 75V25C5 19.4772 9.47715 15 15 15C20.5228 15 25 19.4772 25 25V70C25 72.7614 22.7614 75 20 75C17.2386 75 15 72.7614 15 70V25"
                stroke="#888"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </svg>
    )
}

export function DoodleArrow({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-24 h-12 text-primary", className)}
            {...props}
        >
            <path
                d="M5 25C25 20 55 10 90 25M90 25L75 15M90 25L80 35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw"
            />
        </svg>
    )
}

export function DoodleStar({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-8 h-8 text-accent", className)}
            {...props}
        >
            <path
                d="M20 2L24 14L38 14L26 22L30 36L20 28L10 36L14 22L2 14L16 14L20 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function WireframeBox({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-24 h-24 opacity-20 text-primary", className)}
            {...props}
        >
            <path
                d="M10 10H90V90H10V10Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
            />
            <path d="M10 10L90 90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M90 10L10 90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
    )
}

export function CurlyBrace({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 50 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-12 h-36 text-muted-foreground opacity-30", className)}
            {...props}
        >
            <path
                d="M40 5C20 5 10 25 10 50V65C10 75 0 75 0 75C0 75 10 75 10 85V100C10 125 20 145 40 145"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}

export function ScribbleHighlight({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 200 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-4 text-accent mix-blend-multiply", className)}
            {...props}
        >
            <path
                d="M2 10C20 5 40 15 60 10C80 5 100 15 120 10C140 5 160 15 180 10C190 8 195 12 198 10"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeOpacity="0.5"
            />
        </svg>
    )
}

export function TornEdge({ className, ...props }: IconProps) {
    return (
        <svg
            viewBox="0 0 1000 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-8 text-background", className)}
            preserveAspectRatio="none"
            {...props}
        >
            <path
                d="M0 40V0L20 10L40 0L60 12L80 2L100 10L120 0L140 12L160 2L180 10L200 0L220 12L240 2L260 10L280 0L300 12L320 2L340 10L360 0L380 12L400 2L420 10L440 0L460 12L480 2L500 10L520 0L540 12L560 2L580 10L600 0L620 12L640 2L660 10L680 0L700 12L720 2L740 10L760 0L780 12L800 2L820 10L840 0L860 12L880 2L900 10L920 0L940 12L960 2L980 10L1000 0V40H0Z"
                fill="currentColor"
            />
        </svg>
    )
}
