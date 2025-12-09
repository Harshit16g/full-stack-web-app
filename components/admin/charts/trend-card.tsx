import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrendCardProps {
    title: string
    thisWeek: number
    lastWeek: number
    percentChange: number
    isPositive: boolean
}

export function TrendCard({ title, thisWeek, lastWeek, percentChange, isPositive }: TrendCardProps) {
    return (
        <div className="rounded-lg border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold">{thisWeek}</p>
                <div
                    className={cn(
                        "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                        isPositive
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}
                >
                    {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                    ) : (
                        <TrendingDown className="h-3 w-3" />
                    )}
                    {percentChange > 0 ? "+" : ""}
                    {percentChange}%
                </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
                vs {lastWeek} last week
            </p>
        </div>
    )
}
