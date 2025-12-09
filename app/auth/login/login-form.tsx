"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const { toast } = useToast()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const supabase = createClient()
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                })
                return
            }

            toast({
                title: "Success",
                description: "Logged in successfully",
            })

            // Redirect to admin or specified page
            const redirectTo = searchParams.get("redirectTo") || "/admin"
            router.push(redirectTo)
            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Admin Login</h1>
                    <p className="mt-2 text-muted-foreground">Sign in to access the admin panel</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 rounded-lg border bg-card p-8 shadow-lg">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Protected admin area. Authorized access only.
                </p>
            </div>
        </div>
    )
}
