import React from "react"
import { cn } from "@/lib/utils"
import { Tape, PaperClip } from "./icons"

interface PaperContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    variant?: "default" | "notebook" | "polaroid"
    decoration?: "tape" | "clip" | "none"
    rotate?: "none" | "left" | "right"
}

export function PaperContainer({
    children,
    className,
    variant = "default",
    decoration = "none",
    rotate = "none",
    ...props
}: PaperContainerProps) {
    const rotateClass = {
        none: "",
        left: "-rotate-1",
        right: "rotate-1",
    }[rotate]

    const variantClass = {
        default: "bg-card p-6 paper-card",
        notebook: "bg-card p-8 paper-card bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100%_1.5rem]",
        polaroid: "bg-white p-4 pb-12 shadow-lg rotate-1 border border-gray-200",
    }[variant]

    return (
        <div className={cn("relative transition-transform duration-300 hover:z-10", rotateClass, className)} {...props}>
            {decoration === "tape" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <Tape className="w-32 rotate-2" />
                </div>
            )}
            {decoration === "clip" && (
                <div className="absolute -top-6 right-8 z-20">
                    <PaperClip className="w-8 text-gray-400" />
                </div>
            )}

            <div className={cn("relative z-10 h-full", variantClass)}>
                {children}
            </div>
        </div>
    )
}
