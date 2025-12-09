"use client"

import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

interface CityDistributionChartProps {
    data: { city: string; count: number }[]
}

const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--muted)",
]

const chartConfig = {
    count: {
        label: "Contacts",
    },
} satisfies ChartConfig

export function CityDistributionChart({ data }: CityDistributionChartProps) {
    const total = data.reduce((sum, item) => sum + item.count, 0)

    if (total === 0) {
        return (
            <div className="rounded-lg border bg-card p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Geographic Distribution</h3>
                    <p className="text-sm text-muted-foreground">Contact requests by city</p>
                </div>
                <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                    No data available
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-lg border bg-card p-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Geographic Distribution</h3>
                <p className="text-sm text-muted-foreground">Contact requests by city</p>
            </div>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="city"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        label={({ city, percent }) => `${city} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
            </ChartContainer>
        </div>
    )
}
