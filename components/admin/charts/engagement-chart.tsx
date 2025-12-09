"use client"

import { Area, AreaChart, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

interface EngagementChartProps {
    data: { date: string; engagements: number }[]
}

const chartConfig = {
    engagements: {
        label: "Engagements",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export function EngagementChart({ data }: EngagementChartProps) {
    // Format dates for display
    const formattedData = data.map((item) => ({
        ...item,
        formattedDate: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        }),
    }))

    return (
        <div className="rounded-lg border bg-card p-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Engagement Trends</h3>
                <p className="text-sm text-muted-foreground">Daily contact requests (last 30 days)</p>
            </div>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <AreaChart data={formattedData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="formattedDate"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 10 }}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 10 }}
                        allowDecimals={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                        type="monotone"
                        dataKey="engagements"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="url(#engagementGradient)"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    )
}
