import { Progress } from "@/components/ui/progress"

interface ConversionMetricProps {
    conversionRate: number
    contacts: number
    subscribers: number
}

export function ConversionMetric({ conversionRate, contacts, subscribers }: ConversionMetricProps) {
    return (
        <div className="rounded-lg border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold">{conversionRate}%</p>
                <span className="text-sm text-muted-foreground">contact → subscriber</span>
            </div>
            <div className="mt-4">
                <Progress value={conversionRate} className="h-2" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{contacts} contacts</span>
                <span>{subscribers} subscribers</span>
            </div>
        </div>
    )
}
