import { Suspense } from "react"
import { LoginForm } from "./login-form"

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
