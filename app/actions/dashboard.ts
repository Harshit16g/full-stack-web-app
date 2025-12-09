"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDashboardStats() {
    const supabase = await createClient()

    // Fetch counts for all tables in parallel
    const [projectsResult, clientsResult, contactsResult, subscribersResult] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("contact_requests").select("*", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    ])

    // Fetch recent engagements (last 5 contacts)
    const { data: recentContacts } = await supabase
        .from("contact_requests")
        .select("id, full_name, created_at, message")
        .order("created_at", { ascending: false })
        .limit(5)

    // Fetch all contacts for analytics (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: allContacts } = await supabase
        .from("contact_requests")
        .select("id, city, created_at")
        .gte("created_at", thirtyDaysAgo.toISOString())
        .order("created_at", { ascending: true })

    // Process engagements by day
    const engagementsByDay = processEngagementsByDay(allContacts || [])

    // Process contacts by city
    const contactsByCity = processContactsByCity(allContacts || [])

    // Calculate weekly trend
    const weeklyTrend = calculateWeeklyTrend(allContacts || [])

    // Calculate conversion rate (contacts to subscribers)
    const totalContacts = contactsResult.count || 0
    const totalSubscribers = subscribersResult.count || 0
    const conversionRate = totalContacts > 0
        ? Math.round((totalSubscribers / totalContacts) * 100)
        : 0

    return {
        projects: projectsResult.count || 0,
        clients: clientsResult.count || 0,
        contacts: totalContacts,
        subscribers: totalSubscribers,
        recentEngagements: recentContacts || [],
        engagementsByDay,
        contactsByCity,
        weeklyTrend,
        conversionRate,
    }
}

// Helper: Group contacts by day for the last 30 days
function processEngagementsByDay(contacts: { id: string; created_at: string }[]) {
    const days: { [key: string]: number } = {}

    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const key = date.toISOString().split('T')[0]
        days[key] = 0
    }

    // Count contacts per day
    contacts.forEach(contact => {
        const day = contact.created_at.split('T')[0]
        if (days[day] !== undefined) {
            days[day]++
        }
    })

    return Object.entries(days).map(([date, count]) => ({
        date,
        engagements: count,
    }))
}

// Helper: Group contacts by city
function processContactsByCity(contacts: { id: string; city: string }[]) {
    const cities: { [key: string]: number } = {}

    contacts.forEach(contact => {
        const city = contact.city || "Unknown"
        cities[city] = (cities[city] || 0) + 1
    })

    // Sort by count and take top 5
    const sorted = Object.entries(cities)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)

    // Calculate "Other" category
    const topCitiesCount = sorted.reduce((sum, [, count]) => sum + count, 0)
    const otherCount = contacts.length - topCitiesCount

    const result = sorted.map(([city, count]) => ({ city, count }))
    if (otherCount > 0) {
        result.push({ city: "Other", count: otherCount })
    }

    return result
}

// Helper: Calculate week-over-week trend
function calculateWeeklyTrend(contacts: { id: string; created_at: string }[]) {
    const now = new Date()
    const oneWeekAgo = new Date(now)
    oneWeekAgo.setDate(now.getDate() - 7)
    const twoWeeksAgo = new Date(now)
    twoWeeksAgo.setDate(now.getDate() - 14)

    const thisWeek = contacts.filter(c => new Date(c.created_at) >= oneWeekAgo).length
    const lastWeek = contacts.filter(c => {
        const date = new Date(c.created_at)
        return date >= twoWeeksAgo && date < oneWeekAgo
    }).length

    const percentChange = lastWeek > 0
        ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
        : thisWeek > 0 ? 100 : 0

    return {
        thisWeek,
        lastWeek,
        percentChange,
        isPositive: percentChange >= 0,
    }
}
